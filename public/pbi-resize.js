(function(){
  if (typeof window === 'undefined' || window.powerbiresizescript) {
    return;
  }
  window.powerbiresizescript = 1;

  function getChildByTag(parent, tag) {
    if (!parent) return null;
    for (var i = 0; i < parent.children.length; i++) {
      if (parent.children[i].tagName.toLowerCase() === tag.toLowerCase()) {
        return parent.children[i];
      }
    }
    return null;
  }

  function getIframeElement(srcWindow) {
    var frames = document.getElementsByTagName('iframe');
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].contentWindow === srcWindow) {
        return frames[i];
      }
    }
    return null;
  }

  function showElement(iframe) {
    if (!iframe) return;
    var parent = iframe.parentNode;
    var button = getChildByTag(parent, 'div');
    if (button) parent.removeChild(button);
    var spinner = getChildByTag(parent, 'span');
    if (spinner) parent.removeChild(spinner);
    iframe.style.position = 'static';
    iframe.style.visibility = 'visible';
    var img = getChildByTag(parent, 'img');
    if (img) parent.removeChild(img);
  }

  function setButtonState(button, state) {
    if (!button) return;
    button.setAttribute('data-state', state);
    var states = [
      { state: 'waiting', text: button.getAttribute('pbi-resize-wait-txt') },
      { state: 'loading', text: button.getAttribute('pbi-resize-load-txt') },
      { state: 'loadingnow', text: button.getAttribute('pbi-resize-load-txt') },
      { state: 'ready', text: button.getAttribute('pbi-resize-rdy-txt') },
      { state: 'readynow', text: button.getAttribute('pbi-resize-load-txt') }
    ];
    var text = '';
    for (var i = 0; i < states.length; i++) {
      if (states[i].state === state) {
        text = states[i].text;
      }
    }
    var spinner = getChildByTag(button, 'span');
    button.innerHTML = text + (spinner ? spinner.outerHTML : '');
    switch (state) {
      case 'loading':
        button.onclick = function () { setButtonState(button, 'loadingnow'); };
        button.parentNode.onclick = function () { setButtonState(button, 'loadingnow'); };
        break;
      case 'readynow':
        resize();
        var iframe = getChildByTag(button.parentNode, 'iframe');
        showElement(iframe);
        break;
      case 'ready':
        resize();
        if (spinner) spinner.style.display = 'none';
        button.style.width = 'auto';
        button.onclick = function (e) {
          var iframe = getChildByTag(e.target.parentNode, 'iframe');
          showElement(iframe);
        };
        button.parentNode.onclick = function (e) {
          var iframe = getChildByTag(e.target.parentNode, 'iframe');
          showElement(iframe);
        };
        break;
      default:
        break;
    }
  }

  function isInViewport(element) {
    var bounding = element.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function changeCurrentSrc(img, isWebSize, web, mobile, newSrc) {
    if (!web || !mobile) return;
    var iframe = img.nextElementSibling;
    if (img instanceof HTMLImageElement && iframe && iframe.src && newSrc !== iframe.src) {
      iframe.setAttribute('src', newSrc);
      var btn = getChildByTag(iframe.nextElementSibling, 'div');
      if (btn) setButtonState(btn, 'loading');
    }
    var currentSrc = isWebSize ? web : mobile;
    img.setAttribute('src', currentSrc);
  }

  function resize() {
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
      var evt = document.createEvent('UIEvents');
      evt.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(evt);
    } else {
      window.dispatchEvent(new Event('resize'));
    }
  }

  function loadIframe(parent, src) {
    var iframe = getChildByTag(parent, 'iframe');
    var button = getChildByTag(parent, 'div');
    var spinner = button ? getChildByTag(button, 'span') : null;
    if (spinner) spinner.style.display = 'block';
    iframe.setAttribute('src', src);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowFullScreen', 'true');
    setButtonState(button, 'loading');
  }

  function resizeElement(element, header, actualWidth, isWebSize, webRatio, mobileRatio, webHeight, mobileHeight) {
    var warn = false;
    var pageSize;
    var calcHeight;
    if (mobileRatio && mobileHeight) {
      pageSize = isWebSize ? webRatio : mobileRatio;
      calcHeight = isWebSize ? webHeight : mobileHeight;
    } else {
      pageSize = webRatio;
      calcHeight = webHeight;
    }
    var heightOffset = header && header.toLowerCase() === 'true' ? 36 : 56;
    if (actualWidth < 569 && pageSize === 16 / 9) {
      element.parentNode.style.width = '568.88px';
      element.style.width = '568.88px';
      element.style.height = 320 + heightOffset + 'px';
      warn = true;
    } else if (actualWidth <= 437 && pageSize === 4 / 3) {
      element.parentNode.style.width = '426.66px';
      element.style.width = '426.66px';
      element.style.height = 320 + heightOffset + 'px';
      warn = true;
    } else if (actualWidth < 320 || actualWidth / pageSize < 320 || (calcHeight < 320 && pageSize !== 16 / 9 && pageSize !== 4 / 3)) {
      var height = Math.max(actualWidth, 320) / pageSize;
      if (height < 320) {
        element.parentNode.style.width = 320 * pageSize + 'px';
        element.style.width = 320 * pageSize + 'px';
        element.style.height = 320 + heightOffset + 'px';
      } else if (actualWidth < 320) {
        element.parentNode.style.width = '320px';
        element.style.width = '320px';
        element.style.height = height + heightOffset + 'px';
      } else {
        element.parentNode.style.width = '100%';
        element.style.width = '100%';
        element.style.height = height + heightOffset + 'px';
      }
      warn = true;
    } else {
      element.parentNode.style.width = '100%';
      element.style.width = '100%';
      element.style.height = Math.max(element.clientWidth / pageSize, 320) + heightOffset + 'px';
    }
    if (warn) {
      console.warn('pbi-resize: requested iframe dimension is below the minimum supported dimensions.');
    }
  }

  function setup() {
    var targets = document.querySelectorAll('[pbi-resize="powerbi"]');
    for (var i = 0; i < targets.length; i++) {
      var el = targets[i];
      el.style.width = '100%';
      var actualWidth = el.clientWidth;
      var contentMinWidth = parseInt(el.getAttribute('pbi-resize-min-width') || '0', 10);
      var header = el.getAttribute('pbi-resize-header') || 'false';
      var img = getChildByTag(el, 'img');
      var iframe = getChildByTag(el, 'iframe');
      var webSrc = el.getAttribute('pbi-resize-src');
      var mobileSrc = el.getAttribute('pbi-resize-m-src');
      var webImg = el.getAttribute('pbi-resize-img');
      var mobileImg = el.getAttribute('pbi-resize-m-img') || webImg;
      var webWidth = parseFloat(el.getAttribute('pbi-resize-width') || '0');
      var webHeight = parseFloat(el.getAttribute('pbi-resize-height') || '0');
      var mobileWidth = parseFloat(el.getAttribute('pbi-resize-m-width') || '0');
      var mobileHeight = parseFloat(el.getAttribute('pbi-resize-m-height') || '0');
      var loadEvent = el.getAttribute('pbi-resize-load-event') || 'page-load';
      var isWebSize = actualWidth > contentMinWidth;
      var newSrc = !(webSrc && mobileSrc) ? webSrc : (isWebSize ? webSrc : mobileSrc);
      var currentSrcIsImage = el.children.length > 1;
      var currentSrc = iframe ? iframe.getAttribute('src') : null;

      if (!currentSrc) {
        if (iframe) {
          iframe.style.position = 'absolute';
          iframe.style.top = '0';
          iframe.style.left = '0';
          iframe.style.visibility = 'hidden';
        }
        if (img) {
          img.setAttribute('src', (!isWebSize && mobileImg) ? mobileImg : webImg);
        }
        if ((!webImg && webSrc && isWebSize) || (!mobileImg && mobileSrc && !isWebSize)) {
          iframe.setAttribute('src', (!isWebSize && mobileSrc) ? mobileSrc : webSrc);
          showElement(iframe);
          resize();
          break;
        } else if ((webImg && webSrc) || (mobileImg && mobileSrc)) {
          var button = getChildByTag(el, 'div');
          setButtonState(button, 'waiting');
          switch (loadEvent) {
            case 'page-load':
              loadIframe(iframe.parentNode, newSrc);
              break;
            case 'seconds-timeout':
              var timeout = parseInt(el.getAttribute('pbi-resize-seconds') || '1', 10) * 1000;
              setTimeout(function () {
                loadIframe(iframe.parentNode, newSrc);
              }, timeout);
              break;
            case 'in-view':
              if (currentSrcIsImage && !iframe.src && isInViewport(img)) {
                loadIframe(iframe.parentNode, newSrc);
              }
              window.addEventListener('scroll', function () {
                if (currentSrcIsImage && !iframe.src && isInViewport(img)) {
                  loadIframe(iframe.parentNode, newSrc);
                }
              }, false);
              break;
            case 'click':
              button.onclick = function () { loadIframe(iframe.parentNode, newSrc); };
              el.firstChild.onclick = function () { loadIframe(iframe.parentNode, newSrc); };
              break;
            default:
              break;
          }
        }
      } else if ((currentSrc === webImg && !webImg && webSrc && isWebSize) || (currentSrc === mobileImg && !mobileImg && mobileSrc && !isWebSize)) {
        showElement(iframe);
      }

      if (img) {
        resizeElement(
          img,
          header,
          actualWidth,
          isWebSize,
          webWidth / webHeight,
          mobileWidth ? mobileWidth / mobileHeight : 0,
          webHeight,
          mobileHeight
        );
      }

      if (iframe) {
        resizeElement(
          iframe,
          header,
          actualWidth,
          isWebSize,
          webWidth / webHeight,
          mobileWidth ? mobileWidth / mobileHeight : 0,
          webHeight,
          mobileHeight
        );
      }
    }
  }

  window.onmessage = function (event) {
    function isReportPageLoadedEvent(evt) {
      try {
        return evt && evt.data && evt.data.url === '/reports/undefined/events/pageChanged';
      } catch (error) {
        return false;
      }
    }

    if (isReportPageLoadedEvent(event)) {
      var iframe = getIframeElement(event.source);
      setTimeout(function () {
        if (iframe && iframe.parentNode && iframe.parentNode.children.length > 1) {
          var evtType = iframe.parentNode.getAttribute('pbi-resize-load-event');
          var button = getChildByTag(iframe.parentNode, 'div');
          if (evtType === 'click') {
            showElement(iframe);
          } else if (evtType === 'page-load' || evtType === 'seconds-timeout' || evtType === 'in-view') {
            if (button) {
              setButtonState(button, 'readynow');
            }
          }
        }
      }, (iframe.parentNode.getAttribute('pbi-resize-delay-show') || 1) * 1000);
    }
  };

  document.addEventListener('DOMContentLoaded', setup);
  window.addEventListener('resize', setup, { passive: true });
  window.addEventListener('orientationchange', setup);
})();
