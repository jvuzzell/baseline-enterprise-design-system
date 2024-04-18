import { BannerAlert } from 'banner-alert-js/banner-alert.js';

const Alerts = {
    fullWidthAlerts: [
        {
            type: 'message',
            headline: 'This is an alert headline',
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl',
            customClassList: ['alert-container', 'bg--info-background'],
            buttonClassList: ['btn--tertiary'],
        },
        {
            type: 'error',
            headline: 'This is error alert headline',
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl',
            customClassList: ['alert-container', 'bg--error-background'],
            buttonClassList: ['btn--tertiary'],
        },
        {
            type: 'warning',
            headline: 'This is warning alert headline',
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl',
            customClassList: ['alert-container', 'bg--warning-background'],
            buttonClassList: ['btn--tertiary'],
        },
        {
            type: 'success',
            headline: 'This is success alert headline',
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl',
            customClassList: ['alert-container', 'bg--success-background'],
            buttonClassList: ['btn--tertiary'],
        },
    ],
    basicAlerts: [
        {
            type: 'message',
            headline: 'This is an alert headline',
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl',
            customClassList: ['alert-container', 'bg--info-background'],
            buttonClassList: ['btn--tertiary'],
        },
        {
            type: 'error',
            headline: 'This is error alert headline',
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl',
            customClassList: ['alert-container', 'bg--error-background'],
            buttonClassList: ['btn--tertiary'],
        },
        {
            type: 'warning',
            headline: 'This is warning alert headline',
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl',
            customClassList: ['alert-container', 'bg--warning-background'],
            buttonClassList: ['btn--tertiary'],
        },
        {
            type: 'success',
            headline: 'This is success alert headline',
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl',
            customClassList: ['alert-container', 'bg--success-background'],
            buttonClassList: ['btn--tertiary'],
        },
    ],
    alertsWithButtons: [
        {
            type: 'message',
            headline: 'This is an alert headline',
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl',
            customClassList: ['alert-container', 'bg--info-background'],
            buttonClassList: ['btn--tertiary'],
        },
        {
            type: 'error',
            headline: 'This is error alert headline',
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl',
            customClassList: ['alert-container', 'bg--error-background'],
            buttonClassList: ['btn--tertiary'],
        },
        {
            type: 'warning',
            headline: 'This is warning alert headline',
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl',
            customClassList: ['alert-container', 'bg--warning-background'],
            buttonClassList: ['btn--tertiary'],
        },
        {
            type: 'success',
            headline: 'This is success alert headline',
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl',
            customClassList: ['alert-container', 'bg--success-background'],
            buttonClassList: ['btn--tertiary'],
        },
    ],
};

window.triggerAlertsFullWidth = () => {
    const parentContainer = document.querySelector('.full-width-dismissable-banner-alerts');
    const messageTtl = 100000;
    const alerts = Alerts.fullWidthAlerts;

    alerts.forEach((alert) => {
        const message = `<div class="row"> 
                            <div class="alert-msg col--lg-12">
                              <h4 class="alert-head">${alert.headline}</h4> 
                              <span class="p-2">${alert.message}</span>
                            </div>
                       </div>`;

        BannerAlert.transmit(
            alert.type,
            message,
            parentContainer,
            messageTtl,
            alert.customClassList,
            alert.buttonClassList
        );
    });
};

window.triggerAlerts = () => {
    const parentContainer = document.querySelector('.banner-alerts');
    const messageTtl = 100000;
    const alerts = Alerts.basicAlerts;

    alerts.forEach((alert) => {
        const message = `<div class="row"> 
                            <div class="alert-msg col--lg-12">
                              <h4 class="alert-head">${alert.headline}</h4> 
                              <span class="p-2">${alert.message}</span>
                            </div>
                       </div>`;

        BannerAlert.transmit(
            alert.type,
            message,
            parentContainer,
            messageTtl,
            alert.customClassList,
            alert.buttonClassList
        );
    });
};

window.triggerAlertsWithButton = () => {
    const parentContainer = document.querySelector('.cta-banner-alerts');
    const messageTtl = 100000;
    const alerts = Alerts.alertsWithButtons;

    alerts.forEach((alert) => {
        const message = `<div class="row"> 
                            <div class="alert-msg col--lg-9">
                              <h4 class="alert-head">${alert.headline}</h4> 
                              <span class="p-2">${alert.message}</span>
                            </div>
                            <div class="alert-cta col--lg-3">
                                <button class="btn" href="#">sample Text</button>
                            </div>
                       </div>`;

        BannerAlert.transmit(
            alert.type,
            message,
            parentContainer,
            messageTtl,
            alert.customClassList,
            alert.buttonClassList
        );
    });
};
