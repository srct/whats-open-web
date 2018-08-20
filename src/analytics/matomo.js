export const initMatomo = () => {
    const _paq = _paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);

    const u = '//matomo.srct.gmu.edu/';
    _paq.push(['setTrackerUrl', `${u}piwik.php`]);
    _paq.push(['setSiteId', '2']);

    const newScriptTag = document.createElement('script');
    const firstScriptTag = document.getElementsByTagName('script')[0];

    newScriptTag.type = 'text/javascript';
    newScriptTag.async = true;
    newScriptTag.defer = true;
    newScriptTag.src = `${u}piwik.js`;
    firstScriptTag.parentNode.insertBefore(newScriptTag, firstScriptTag);
};