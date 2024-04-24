const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./deploy/config.json');

const htmlFileRegex = new RegExp('(src/pages/|src\\\\pages\\\\)', 'ig');

let directories = config.entryPoints.pages.directory;

let htmlFiles = [];
let entryPoints = {};

while (directories.length > 0) {
    let directory = directories.pop();

    let dirContents = fs.readdirSync(directory).map((file) => path.join(directory, file));

    dirContents.filter((file) => file.endsWith('.htm')).forEach((tmplFile) => {
        const newHtmlFile = tmplFile.replace(/\.htm$/, '.html');
        
        fs.copyFileSync(tmplFile, newHtmlFile);
        let content = fs.readFileSync(newHtmlFile, 'utf8');

        const tagRegex = /{{(.*)}}/g;
        let match;

        while ((match = tagRegex.exec(content)) !== null) {
            const componentPath = path.join(path.dirname(newHtmlFile), match[1]); 

            if (fs.existsSync(componentPath)) {
                const componentContent = fs.readFileSync(componentPath, 'utf8');
                content = content.replace(match[0], componentContent);
            }
        }

        fs.writeFileSync(newHtmlFile, content, 'utf8');
    });

    htmlFiles.push(...dirContents.filter((file) => file.endsWith('.html')));
    directories.push(...dirContents.filter((file) => fs.statSync(file).isDirectory()));
}

htmlFiles.map((file) => {
    let name = file.replace(htmlFileRegex, '');
    const extensions = ['.jsx', '.js', '.tsx'];
    const fileExtension = getFileExtension(file.replace('.html', ''), extensions);
    entryPoints[name] = path.resolve(__dirname, file.replace('.html', fileExtension));
});

function getFileExtension(filename, extensions) {
    for (let i = 0; i < extensions.length; i++) {
        const filepath = filename + extensions[i];
        if (fs.existsSync(filepath)) {
            return extensions[i];
        }
    }
    return null;
}

module.exports = (env) => {
    const environment = env.env;
    const target = config.targets[environment];
    const outputPath = target.outputPath;
    const publicPath = target.publicPath;
    const assetModuleFilename = target.assetModuleFilename;

    const clean = environment === 'dev' ? true : false;
    const watch = env.watch === 'true' ? true : false;

    return {
        stats: {
            loggingDebug: ['sass-loader'],
        },
        entry: entryPoints,
        output: {
            path: path.resolve(__dirname, outputPath),
            filename: '[name].js',
            clean: clean,
            assetModuleFilename: assetModuleFilename + './[name][ext]',
            publicPath: publicPath + '/',
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.scss|.css$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/styles/[name].css',
                    },
                    use: [
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sassOptions: {
                                    outputStyle: environment !== 'dev' ? 'compressed' : undefined,
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif|jpe?g|ico)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/images/[name][ext]',
                    },
                },
                {
                    test: /\.(woff|woff2|ttf)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/webfonts/[name][ext]',
                    },
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
        },
        watch: watch,
        watchOptions: {
            aggregateTimeout: 200,
            poll: 1000,
        },
        plugins: [
            ...htmlFiles.map((htmlFile) => {
                return new HtmlWebpackPlugin({
                    template: htmlFile,
                    filename: htmlFile.replace(htmlFileRegex, ''),
                    chunks: [htmlFile.replace(htmlFileRegex, '')],
                    inject: false
                });
            })
        ],
        devServer: {
            historyApiFallback: true,
        },
    };
};
