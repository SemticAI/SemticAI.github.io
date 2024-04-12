/* -------------------------------------------------------------------------- */
/*                                    Utils                                   */
/* -------------------------------------------------------------------------- */
const docReady = fn => {
  // see if DOM is already available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    setTimeout(fn, 1);
  }
};
const isRTL = () => {
  return document.querySelector('html').getAttribute('dir') === 'rtl';
};
const resize = fn => window.addEventListener('resize', fn);
const isIterableArray = array => Array.isArray(array) && !!array.length;
const camelize = str => {
  const text = str.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
  return `${text.substr(0, 1).toLowerCase()}${text.substr(1)}`;
};
const getData = (el, data) => {
  try {
    return JSON.parse(el.dataset[camelize(data)]);
  } catch (e) {
    return el.dataset[camelize(data)];
  }
};

/* ----------------------------- Colors function ---------------------------- */

const hexToRgb = hexValue => {
  let hex;
  hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue;
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b));
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};
const rgbaColor = (color = '#fff', alpha = 0.5) => `rgba(${hexToRgb(color)}, ${alpha})`;

/* --------------------------------- Colors --------------------------------- */

const getColor = (name, dom = document.documentElement) => getComputedStyle(dom).getPropertyValue(`--reign-${name}`).trim();
const getColors = dom => ({
  primary: getColor('primary', dom),
  secondary: getColor('secondary', dom),
  success: getColor('success', dom),
  info: getColor('info', dom),
  warning: getColor('warning', dom),
  danger: getColor('danger', dom),
  light: getColor('light', dom),
  dark: getColor('dark', dom)
});
const getSoftColors = dom => ({
  primary: getColor('soft-primary', dom),
  secondary: getColor('soft-secondary', dom),
  success: getColor('soft-success', dom),
  info: getColor('soft-info', dom),
  warning: getColor('soft-warning', dom),
  danger: getColor('soft-danger', dom),
  light: getColor('soft-light', dom),
  dark: getColor('soft-dark', dom)
});
const getGrays = dom => ({
  white: getColor('white', dom),
  100: getColor('100', dom),
  200: getColor('200', dom),
  300: getColor('300', dom),
  400: getColor('400', dom),
  500: getColor('500', dom),
  600: getColor('600', dom),
  700: getColor('700', dom),
  800: getColor('800', dom),
  900: getColor('900', dom),
  1000: getColor('1000', dom),
  1100: getColor('1100', dom),
  black: getColor('black', dom)
});
const hasClass = (el, className) => {
  !el && false;
  return el.classList.value.includes(className);
};
const addClass = (el, className) => {
  el.classList.add(className);
};
const getOffset = el => {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};

// function isScrolledIntoView(el) {
//   const rect = el.getBoundingClientRect();
//   const windowHeight =
//     window.innerHeight || document.documentElement.clientHeight;
//   const windowWidth = window.innerWidth || document.documentElement.clientWidth;

//   const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
//   const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

//   return vertInView && horInView;
// }

const isScrolledIntoView = el => {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  const width = el.offsetWidth;
  const height = el.offsetHeight;
  while (el.offsetParent) {
    // eslint-disable-next-line no-param-reassign
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  return {
    all: top >= window.pageYOffset && left >= window.pageXOffset && top + height <= window.pageYOffset + window.innerHeight && left + width <= window.pageXOffset + window.innerWidth,
    partial: top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && top + height > window.pageYOffset && left + width > window.pageXOffset
  };
};
const isElementIntoView = el => {
  const position = el.getBoundingClientRect();
  // checking whether fully visible
  if (position.top >= 0 && position.bottom <= window.innerHeight) {
    return true;
  }

  // checking for partial visibility
  if (position.top < window.innerHeight && position.bottom >= 0) {
    return true;
  }
};
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540
};
const getBreakpoint = el => {
  const classes = el && el.classList.value;
  let breakpoint;
  if (classes) {
    breakpoint = breakpoints[classes.split(' ').filter(cls => cls.includes('navbar-expand-')).pop().split('-').pop()];
  }
  return breakpoint;
};
const getCurrentScreenBreakpoint = () => {
  let currentBreakpoint = '';
  if (window.innerWidth >= breakpoints.xl) {
    currentBreakpoint = 'xl';
  } else if (window.innerWidth >= breakpoints.lg) {
    currentBreakpoint = 'lg';
  } else if (window.innerWidth >= breakpoints.md) {
    currentBreakpoint = 'md';
  } else {
    currentBreakpoint = 'sm';
  }
  const breakpointStartVal = breakpoints[currentBreakpoint];
  return {
    currentBreakpoint,
    breakpointStartVal
  };
};

/* --------------------------------- Cookie --------------------------------- */

const setCookie = (name, value, expire) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + expire);
  document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
};
const getCookie = name => {
  var keyValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : keyValue;
};
const settings = {
  tinymce: {
    theme: 'oxide'
  },
  chart: {
    borderColor: 'rgba(255, 255, 255, 0.8)'
  }
};

/* -------------------------- Chart Initialization -------------------------- */

const newChart = (chart, config) => {
  const ctx = chart.getContext('2d');
  return new window.Chart(ctx, config);
};

/* ---------------------------------- Store --------------------------------- */

const getItemFromStore = (key, defaultValue, store = localStorage) => {
  try {
    return JSON.parse(store.getItem(key)) || defaultValue;
  } catch {
    return store.getItem(key) || defaultValue;
  }
};
const setItemToStore = (key, payload, store = localStorage) => store.setItem(key, payload);
const getStoreSpace = (store = localStorage) => parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));

/* get Dates between */

const getDates = (startDate, endDate, interval = 1000 * 60 * 60 * 24) => {
  const duration = endDate - startDate;
  const steps = duration / interval;
  return Array.from({
    length: steps + 1
  }, (v, i) => new Date(startDate.valueOf() + interval * i));
};
const getPastDates = duration => {
  let days;
  switch (duration) {
    case 'week':
      days = 7;
      break;
    case 'month':
      days = 30;
      break;
    case 'year':
      days = 365;
      break;
    default:
      days = duration;
  }
  const date = new Date();
  const endDate = date;
  const startDate = new Date(new Date().setDate(date.getDate() - (days - 1)));
  return getDates(startDate, endDate);
};

/* Get Random Number */
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const utils = {
  docReady,
  breakpoints,
  isRTL,
  resize,
  isIterableArray,
  camelize,
  getData,
  hasClass,
  addClass,
  hexToRgb,
  rgbaColor,
  getColor,
  getColors,
  getSoftColors,
  getGrays,
  getOffset,
  isScrolledIntoView,
  isElementIntoView,
  getBreakpoint,
  getCurrentScreenBreakpoint,
  setCookie,
  getCookie,
  newChart,
  settings,
  getItemFromStore,
  setItemToStore,
  getStoreSpace,
  getDates,
  getPastDates,
  getRandomNumber
};

/* -------------------------------------------------------------------------- */
/*                                  Detector                                  */
/* -------------------------------------------------------------------------- */

const detectorInit = () => {
  const {
    is
  } = window;
  const html = document.querySelector('html');
  is.opera() && addClass(html, 'opera');
  is.mobile() && addClass(html, 'mobile');
  is.firefox() && addClass(html, 'firefox');
  is.safari() && addClass(html, 'safari');
  is.ios() && addClass(html, 'ios');
  is.iphone() && addClass(html, 'iphone');
  is.ipad() && addClass(html, 'ipad');
  is.ie() && addClass(html, 'ie');
  is.edge() && addClass(html, 'edge');
  is.chrome() && addClass(html, 'chrome');
  is.mac() && addClass(html, 'osx');
  is.windows() && addClass(html, 'windows');
  navigator.userAgent.match('CriOS') && addClass(html, 'chrome');
};

/*-----------------------------------------------
|   DomNode
-----------------------------------------------*/
class DomNode {
  constructor(node) {
    this.node = node;
  }
  addClass(className) {
    this.isValidNode() && this.node.classList.add(className);
  }
  removeClass(className) {
    this.isValidNode() && this.node.classList.remove(className);
  }
  toggleClass(className) {
    this.isValidNode() && this.node.classList.toggle(className);
  }
  hasClass(className) {
    this.isValidNode() && this.node.classList.contains(className);
  }
  data(key) {
    if (this.isValidNode()) {
      try {
        return JSON.parse(this.node.dataset[this.camelize(key)]);
      } catch (e) {
        return this.node.dataset[this.camelize(key)];
      }
    }
    return null;
  }
  attr(name) {
    return this.isValidNode() && this.node[name];
  }
  setAttribute(name, value) {
    this.isValidNode() && this.node.setAttribute(name, value);
  }
  removeAttribute(name) {
    this.isValidNode() && this.node.removeAttribute(name);
  }
  setProp(name, value) {
    this.isValidNode() && (this.node[name] = value);
  }
  on(event, cb) {
    this.isValidNode() && this.node.addEventListener(event, cb);
  }
  isValidNode() {
    return !!this.node;
  }

  // eslint-disable-next-line class-methods-use-this
  camelize(str) {
    const text = str.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
    return `${text.substr(0, 1).toLowerCase()}${text.substr(1)}`;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Anchor JS                                 */
/* -------------------------------------------------------------------------- */

const anchors = new window.AnchorJS();
anchors.options = {
  icon: "#"
};
anchors.add("[data-anchor]");

/*-----------------------------------------------
|   ScrollTotop
-----------------------------------------------*/
const BackToTopInit = () => {
  const backToTopEl = document.querySelector(".btn-back-to-top");
  if (backToTopEl) {
    backToTopEl.style.opacity = 0;
    window.addEventListener("scroll", () => {
      if (backToTopEl.offsetTop + window.scrollY < window.innerHeight) {
        backToTopEl.style.opacity = 0;
      } else {
        backToTopEl.style.opacity = 1;
      }
    });
  }
};

/* -------------------------------------------------------------------------- 
|                                 bg player                                  
--------------------------------------------------------------------------- */

const bgPlayerInit = () => {
  const Selector = {
    DATA_YOUTUBE_EMBED: "[data-youtube-embed]",
    YT_VIDEO: ".yt-video"
  };
  const DATA_KEY = {
    YOUTUBE_EMBED: "youtube-embed"
  };
  const ClassName = {
    LOADED: "loaded"
  };
  const Events = {
    SCROLL: "scroll",
    LOADING: "loading",
    DOM_CONTENT_LOADED: "DOMContentLoaded"
  };
  const youtubeEmbedElements = document.querySelectorAll(Selector.DATA_YOUTUBE_EMBED);
  const loadVideo = () => {
    function setupPlayer() {
      window.YT.ready(function () {
        youtubeEmbedElements.forEach(youtubeEmbedElement => {
          const userOptions = utils.getData(youtubeEmbedElement, DATA_KEY.YOUTUBE_EMBED);
          const defaultOptions = {
            videoId: "hLpy-DRuiz0",
            startSeconds: 1,
            endSeconds: 50
          };
          const options = window._.merge(defaultOptions, userOptions);
          const youTubePlayer = () => {
            // eslint-disable-next-line
            new YT.Player(youtubeEmbedElement, {
              videoId: options.videoId,
              playerVars: {
                autoplay: 1,
                disablekb: 1,
                controls: 0,
                modestbranding: 1,
                // Hide the Youtube Logo
                loop: 1,
                fs: 0,
                enablejsapi: 0,
                start: options?.startSeconds,
                end: options?.endSeconds
              },
              events: {
                onReady: e => {
                  e.target.mute();
                  e.target.playVideo();
                },
                onStateChange: e => {
                  if (e.data === window.YT.PlayerState.PLAYING) {
                    document.querySelectorAll(Selector.DATA_YOUTUBE_EMBED).forEach(embedElement => {
                      embedElement.classList.add(ClassName.LOADED);
                    });
                  }
                  if (e.data === window.YT.PlayerState.PAUSED) {
                    e.target.playVideo();
                  }
                  if (e.data === window.YT.PlayerState.ENDED) {
                    // Loop from starting point
                    e.target.seekTo(options.startSeconds);
                  }
                }
              }
            });
          };
          youTubePlayer();
        });
      });
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    tag.onload = setupPlayer;
  };
  if (document.readyState !== Events.LOADING) {
    loadVideo();
  } else {
    document.addEventListener(Events.DOM_CONTENT_LOADED, () => loadVideo());
  }

  /* -------------------------------------------------------------------------- 
  |                                 Adjust BG Ratio                                
  --------------------------------------------------------------------------- */

  const adjustBackgroundRatio = () => {
    const ytElements = document.querySelectorAll(Selector.YT_VIDEO);
    ytElements.forEach(ytEl => {
      const ytElement = ytEl;
      const width = ytElement.parentElement.offsetWidth + 200;
      const height = width * 9 / 16;
      const minHeight = ytElement.parentElement.offsetHeight + 112;
      const minWidth = minHeight * 16 / 9;
      ytElement.style.width = width + "px";
      ytElement.style.height = height + "px";
      ytElement.style.minHeight = minHeight + "px";
      ytElement.style.minWidth = minWidth + "px";
    });
  };
  adjustBackgroundRatio();
  document.addEventListener(Events.SCROLL, () => adjustBackgroundRatio());
};

/* -------------------------------------------------------------------------- */
/*                                 bigPicture                                 */
/* -------------------------------------------------------------------------- */

const bigPictureInit = () => {
  if (window.BigPicture) {
    const bpItems = document.querySelectorAll("[data-bigpicture]");
    bpItems.forEach(bpItem => {
      const userOptions = utils.getData(bpItem, "bigpicture");
      const defaultOptions = {
        el: bpItem,
        noLoader: true,
        allowfullscreen: true
      };
      const options = window._.merge(defaultOptions, userOptions);
      bpItem.addEventListener("click", () => {
        window.BigPicture(options);
      });

      //  style
      if (userOptions.imgSrc && !bpItem.classList.value.split(" ").filter(className => className.indexOf("btn") === 0)[0]) {
        const styleCursorElement = bpItem;
        styleCursorElement.style.cursor = "zoom-in";
      }
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                  Count Up                                  */
/* -------------------------------------------------------------------------- */
const countupInit = () => {
  if (window.countUp) {
    const countups = document.querySelectorAll("[data-countup]");
    if (countups.length) {
      countups.forEach(node => {
        const {
          endValue,
          ...options
        } = utils.getData(node, "countup");
        let countUpTriggered = false;
        window.addEventListener("scroll", () => {
          if (utils.isScrolledIntoView(node).partial) {
            if (!countUpTriggered) {
              const countUp = new window.countUp.CountUp(node, endValue, {
                duration: 5,
                ...options
              });
              countUp.start();
              countUpTriggered = true;
            }
          }
        });
      });
    }
  }
};

/*-----------------------------------------------
|   Dashboard Table dropdown
-----------------------------------------------*/
const dropdownMenuInit = () => {
  // Only for ios
  if (window.is.ios()) {
    const Event = {
      SHOWN_BS_DROPDOWN: "shown.bs.dropdown",
      HIDDEN_BS_DROPDOWN: "hidden.bs.dropdown"
    };
    const Selector = {
      TABLE_RESPONSIVE: ".table-responsive",
      DROPDOWN_MENU: ".dropdown-menu"
    };
    document.querySelectorAll(Selector.TABLE_RESPONSIVE).forEach(table => {
      table.addEventListener(Event.SHOWN_BS_DROPDOWN, e => {
        const t = e.currentTarget;
        if (t.scrollWidth > t.clientWidth) {
          t.style.paddingBottom = `${e.target.nextElementSibling.clientHeight}px`;
        }
      });
      table.addEventListener(Event.HIDDEN_BS_DROPDOWN, e => {
        e.currentTarget.style.paddingBottom = "";
      });
    });
  }
};

// Reference
// https://github.com/twbs/bootstrap/issues/11037#issuecomment-274870381

/* -------------------------------------------------------------------------- */
/*                           Open dropdown on hover                           */
/* -------------------------------------------------------------------------- */

const dropdownOnHover = () => {
  const navbarArea = document.querySelectorAll('[data-bs-toggle="dropdown-on-hover"]');
  if (navbarArea) {
    navbarArea.forEach(navbarItem => {
      navbarItem.addEventListener('mouseover', e => {
        if (e.target.className.includes('dropdown-toggle')) {
          const dropdownInstance = new window.bootstrap.Dropdown(e.target);

          /* eslint-disable no-underscore-dangle */
          dropdownInstance._element.classList.add('show');
          dropdownInstance._menu.classList.add('show');
          dropdownInstance._menu.setAttribute('data-bs-popper', 'none');
          e.target.parentNode.addEventListener('mouseleave', () => {
            dropdownInstance.hide();
          });
        }
      });
    });
  }
};

/* eslint-disable*/
/* -------------------------------------------------------------------------- */
/*                                Universal contact form ajax submission                                  */
/* -------------------------------------------------------------------------- */
const formInit = () => {
  const zforms = document.querySelectorAll("[data-form]");
  if (zforms.length) {
    zforms.forEach(form => {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const feedbackEl = form.querySelector(".feedback");
        const formData = {};
        Array.from(form.elements).forEach(el => {
          if (el.type !== "submit") {
            formData[el.name] = el.value;
          }
        });
        window.Email.send({
          Host: "smtp.mailtrap.io",
          Username: "Your User Name ",
          Password: "Your Password",
          To: formData.email,
          From: "you@isp.com",
          Subject: "This is the subject",
          Body: `
            <p>${formData.name}</p>
            <p>${formData.message}</p>
          `
        }).then(message => {
          feedbackEl.innerHTML = `<div class="alert alert-success alert-dismissible" role="alert">
            <button type="button" class="btn-close fs--1" data-bs-dismiss="alert" aria-label="Close"></button>
            Your message has been sent successfully.
          </div>`;
        }).catch(error => {
          feedbackEl.innerHTML = `<div class="alert alert-danger alert-dismissible" role="alert">
          <button type="button" class="btn-close fs--1" data-bs-dismiss="alert" aria-label="Close"></button>
          Your message not sent.
        </div>`;
        });
      });
    });
  }
};

/*-----------------------------------------------
|   Gooogle Map
-----------------------------------------------*/

function initMap() {
  const themeController = document.body;
  const $googlemaps = document.querySelectorAll(".googlemap");
  if ($googlemaps.length && window.google) {
    // Visit https://snazzymaps.com/ for more themes
    const mapStyles = {
      Default: [{
        featureType: "water",
        elementType: "geometry",
        stylers: [{
          color: "#e9e9e9"
        }, {
          lightness: 17
        }]
      }, {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{
          color: "#f5f5f5"
        }, {
          lightness: 20
        }]
      }, {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{
          color: "#ffffff"
        }, {
          lightness: 17
        }]
      }, {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#ffffff"
        }, {
          lightness: 29
        }, {
          weight: 0.2
        }]
      }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{
          color: "#ffffff"
        }, {
          lightness: 18
        }]
      }, {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{
          color: "#ffffff"
        }, {
          lightness: 16
        }]
      }, {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{
          color: "#f5f5f5"
        }, {
          lightness: 21
        }]
      }, {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{
          color: "#dedede"
        }, {
          lightness: 21
        }]
      }, {
        elementType: "labels.text.stroke",
        stylers: [{
          visibility: "on"
        }, {
          color: "#ffffff"
        }, {
          lightness: 16
        }]
      }, {
        elementType: "labels.text.fill",
        stylers: [{
          saturation: 36
        }, {
          color: "#333333"
        }, {
          lightness: 40
        }]
      }, {
        elementType: "labels.icon",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{
          color: "#f2f2f2"
        }, {
          lightness: 19
        }]
      }, {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [{
          color: "#fefefe"
        }, {
          lightness: 20
        }]
      }, {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#fefefe"
        }, {
          lightness: 17
        }, {
          weight: 1.2
        }]
      }],
      Gray: [{
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{
          saturation: 36
        }, {
          color: "#000000"
        }, {
          lightness: 40
        }]
      }, {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [{
          visibility: "on"
        }, {
          color: "#000000"
        }, {
          lightness: 16
        }]
      }, {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 20
        }]
      }, {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 17
        }, {
          weight: 1.2
        }]
      }, {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 20
        }]
      }, {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 21
        }]
      }, {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 17
        }]
      }, {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 29
        }, {
          weight: 0.2
        }]
      }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 18
        }]
      }, {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 16
        }]
      }, {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 19
        }]
      }, {
        featureType: "water",
        elementType: "geometry",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 17
        }]
      }],
      Midnight: [{
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#ffffff"
        }]
      }, {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 13
        }]
      }, {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [{
          color: "#000000"
        }]
      }, {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#144b53"
        }, {
          lightness: 14
        }, {
          weight: 1.4
        }]
      }, {
        featureType: "landscape",
        elementType: "all",
        stylers: [{
          color: "#08304b"
        }]
      }, {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{
          color: "#0c4152"
        }, {
          lightness: 5
        }]
      }, {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{
          color: "#000000"
        }]
      }, {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#0b434f"
        }, {
          lightness: 25
        }]
      }, {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [{
          color: "#000000"
        }]
      }, {
        featureType: "road.arterial",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#0b3d51"
        }, {
          lightness: 16
        }]
      }, {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{
          color: "#000000"
        }]
      }, {
        featureType: "transit",
        elementType: "all",
        stylers: [{
          color: "#146474"
        }]
      }, {
        featureType: "water",
        elementType: "all",
        stylers: [{
          color: "#021019"
        }]
      }],
      Hopper: [{
        featureType: "water",
        elementType: "geometry",
        stylers: [{
          hue: "#165c64"
        }, {
          saturation: 34
        }, {
          lightness: -69
        }, {
          visibility: "on"
        }]
      }, {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{
          hue: "#b7caaa"
        }, {
          saturation: -14
        }, {
          lightness: -18
        }, {
          visibility: "on"
        }]
      }, {
        featureType: "landscape.man_made",
        elementType: "all",
        stylers: [{
          hue: "#cbdac1"
        }, {
          saturation: -6
        }, {
          lightness: -9
        }, {
          visibility: "on"
        }]
      }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [{
          hue: "#8d9b83"
        }, {
          saturation: -89
        }, {
          lightness: -12
        }, {
          visibility: "on"
        }]
      }, {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{
          hue: "#d4dad0"
        }, {
          saturation: -88
        }, {
          lightness: 54
        }, {
          visibility: "simplified"
        }]
      }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{
          hue: "#bdc5b6"
        }, {
          saturation: -89
        }, {
          lightness: -3
        }, {
          visibility: "simplified"
        }]
      }, {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{
          hue: "#bdc5b6"
        }, {
          saturation: -89
        }, {
          lightness: -26
        }, {
          visibility: "on"
        }]
      }, {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{
          hue: "#c17118"
        }, {
          saturation: 61
        }, {
          lightness: -45
        }, {
          visibility: "on"
        }]
      }, {
        featureType: "poi.park",
        elementType: "all",
        stylers: [{
          hue: "#8ba975"
        }, {
          saturation: -46
        }, {
          lightness: -28
        }, {
          visibility: "on"
        }]
      }, {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{
          hue: "#a43218"
        }, {
          saturation: 74
        }, {
          lightness: -51
        }, {
          visibility: "simplified"
        }]
      }, {
        featureType: "administrative.province",
        elementType: "all",
        stylers: [{
          hue: "#ffffff"
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: "simplified"
        }]
      }, {
        featureType: "administrative.neighborhood",
        elementType: "all",
        stylers: [{
          hue: "#ffffff"
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: "off"
        }]
      }, {
        featureType: "administrative.locality",
        elementType: "labels",
        stylers: [{
          hue: "#ffffff"
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: "off"
        }]
      }, {
        featureType: "administrative.land_parcel",
        elementType: "all",
        stylers: [{
          hue: "#ffffff"
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: "off"
        }]
      }, {
        featureType: "administrative",
        elementType: "all",
        stylers: [{
          hue: "#3a3935"
        }, {
          saturation: 5
        }, {
          lightness: -57
        }, {
          visibility: "off"
        }]
      }, {
        featureType: "poi.medical",
        elementType: "geometry",
        stylers: [{
          hue: "#cba923"
        }, {
          saturation: 50
        }, {
          lightness: -46
        }, {
          visibility: "on"
        }]
      }],
      Beard: [{
        featureType: "poi.business",
        elementType: "labels.text",
        stylers: [{
          visibility: "on"
        }, {
          color: "#333333"
        }]
      }],
      AssassianCreed: [{
        featureType: "all",
        elementType: "all",
        stylers: [{
          visibility: "on"
        }]
      }, {
        featureType: "all",
        elementType: "labels",
        stylers: [{
          visibility: "off"
        }, {
          saturation: "-100"
        }]
      }, {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{
          saturation: 36
        }, {
          color: "#000000"
        }, {
          lightness: 40
        }, {
          visibility: "off"
        }]
      }, {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [{
          visibility: "off"
        }, {
          color: "#000000"
        }, {
          lightness: 16
        }]
      }, {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 20
        }]
      }, {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 17
        }, {
          weight: 1.2
        }]
      }, {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 20
        }]
      }, {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [{
          color: "#4d6059"
        }]
      }, {
        featureType: "landscape",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#4d6059"
        }]
      }, {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [{
          color: "#4d6059"
        }]
      }, {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{
          lightness: 21
        }]
      }, {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [{
          color: "#4d6059"
        }]
      }, {
        featureType: "poi",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#4d6059"
        }]
      }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [{
          visibility: "on"
        }, {
          color: "#7f8d89"
        }]
      }, {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [{
          color: "#7f8d89"
        }]
      }, {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{
          color: "#7f8d89"
        }, {
          lightness: 17
        }]
      }, {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#7f8d89"
        }, {
          lightness: 29
        }, {
          weight: 0.2
        }]
      }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 18
        }]
      }, {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [{
          color: "#7f8d89"
        }]
      }, {
        featureType: "road.arterial",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#7f8d89"
        }]
      }, {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 16
        }]
      }, {
        featureType: "road.local",
        elementType: "geometry.fill",
        stylers: [{
          color: "#7f8d89"
        }]
      }, {
        featureType: "road.local",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#7f8d89"
        }]
      }, {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{
          color: "#000000"
        }, {
          lightness: 19
        }]
      }, {
        featureType: "water",
        elementType: "all",
        stylers: [{
          color: "#2b3638"
        }, {
          visibility: "on"
        }]
      }, {
        featureType: "water",
        elementType: "geometry",
        stylers: [{
          color: "#2b3638"
        }, {
          lightness: 17
        }]
      }, {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{
          color: "#24282b"
        }]
      }, {
        featureType: "water",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#24282b"
        }]
      }, {
        featureType: "water",
        elementType: "labels",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "water",
        elementType: "labels.text",
        stylers: [{
          visibility: "off "
        }]
      }, {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "water",
        elementType: "labels.icon",
        stylers: [{
          visibility: "off"
        }]
      }],
      SubtleGray: [{
        featureType: "administrative",
        elementType: "all",
        stylers: [{
          saturation: "-100"
        }]
      }, {
        featureType: "administrative.province",
        elementType: "all",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "landscape",
        elementType: "all",
        stylers: [{
          saturation: -100
        }, {
          lightness: 65
        }, {
          visibility: "on"
        }]
      }, {
        featureType: "poi",
        elementType: "all",
        stylers: [{
          saturation: -100
        }, {
          lightness: "50"
        }, {
          visibility: "simplified"
        }]
      }, {
        featureType: "road",
        elementType: "all",
        stylers: [{
          saturation: -100
        }]
      }, {
        featureType: "road.highway",
        elementType: "all",
        stylers: [{
          visibility: "simplified"
        }]
      }, {
        featureType: "road.arterial",
        elementType: "all",
        stylers: [{
          lightness: "30"
        }]
      }, {
        featureType: "road.local",
        elementType: "all",
        stylers: [{
          lightness: "40"
        }]
      }, {
        featureType: "transit",
        elementType: "all",
        stylers: [{
          saturation: -100
        }, {
          visibility: "simplified"
        }]
      }, {
        featureType: "water",
        elementType: "geometry",
        stylers: [{
          hue: "#ffff00"
        }, {
          lightness: -25
        }, {
          saturation: -97
        }]
      }, {
        featureType: "water",
        elementType: "labels",
        stylers: [{
          lightness: -25
        }, {
          saturation: -100
        }]
      }],
      Tripitty: [{
        featureType: "all",
        elementType: "labels",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "administrative",
        elementType: "all",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "landscape",
        elementType: "all",
        stylers: [{
          color: "#2c5ca5"
        }]
      }, {
        featureType: "poi",
        elementType: "all",
        stylers: [{
          color: "#2c5ca5"
        }]
      }, {
        featureType: "road",
        elementType: "all",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "transit",
        elementType: "all",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "water",
        elementType: "all",
        stylers: [{
          color: "#193a70"
        }, {
          visibility: "on"
        }]
      }],
      Cobalt: [{
        "featureType": "all",
        "elementType": "all",
        "stylers": [{
          "invert_lightness": true
        }, {
          "saturation": 10
        }, {
          "lightness": 30
        }, {
          "gamma": 0.5
        }, {
          "hue": "#435158"
        }]
      }]
    };
    $googlemaps.forEach(itm => {
      const latLng = utils.getData(itm, "latlng").split(",");
      const markerPopup = itm.innerHTML;
      const icon = utils.getData(itm, "icon") ? utils.getData(itm, "icon") : "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png";
      const zoom = utils.getData(itm, "zoom");
      const mapElement = itm;
      const mapStyle = utils.getData(itm, "theme");
      if (utils.getData(itm, "theme") === "streetview") {
        const pov = utils.getData(itm, "pov");
        const mapOptions = {
          position: {
            lat: Number(latLng[0]),
            lng: Number(latLng[1])
          },
          pov,
          zoom,
          gestureHandling: "none",
          scrollwheel: false
        };
        return new window.google.maps.StreetViewPanorama(mapElement, mapOptions);
      }
      const mapOptions = {
        zoom,
        scrollwheel: utils.getData(itm, "scrollwheel"),
        center: new window.google.maps.LatLng(latLng[0], latLng[1]),
        styles: localStorage.getItem("theme") === "dark" ? mapStyles.Cobalt : mapStyles[mapStyle]
      };
      const map = new window.google.maps.Map(mapElement, mapOptions);
      const infowindow = new window.google.maps.InfoWindow({
        content: markerPopup
      });
      const marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(latLng[0], latLng[1]),
        icon,
        map
      });
      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
      themeController && themeController.addEventListener("clickControl", ({
        detail: {
          control,
          value
        }
      }) => {
        if (control === "theme") {
          map.set("styles", value === "dark" ? mapStyles.Cobalt : mapStyles[mapStyle]);
        }
      });
      return null;
    });
  }
}

// import utils from "./utils";
/*-----------------------------------------------
|   Hover Dir 
-----------------------------------------------*/

const hoverDirInit = () => {
  const hoverdir = document.querySelectorAll(".hoverdir-item > .hoverdir-item-content");
  if (hoverdir.length) {
    window.hoverDir(hoverdir);
  }
};

/*-----------------------------------------------
|                     Isotope
-----------------------------------------------*/

const isotopeInit = () => {
  const Selector = {
    ISOTOPE_ITEM: ".isotope-item",
    DATA_ISOTOPE: "[data-rp-isotope]",
    DATA_FILTER: "[data-filter]",
    DATA_FILER_NAV: "[data-filter-NAV]"
  };
  const DATA_KEY = {
    ISOTOPE: "isotope"
  };
  const ClassName = {
    ACTIVE: "active"
  };
  if (window.Isotope) {
    const masonryItems = document.querySelectorAll(Selector.DATA_ISOTOPE);
    masonryItems.length && masonryItems.forEach(masonryItem => {
      window.imagesLoaded(masonryItem, () => {
        masonryItem.querySelectorAll(Selector.ISOTOPE_ITEM).forEach(item => {
          // eslint-disable-next-line
          item.style.visibility = "visible";
        });
        const userOptions = utils.getData(masonryItem, DATA_KEY.ISOTOPE);
        const defaultOptions = {
          itemSelector: Selector.ISOTOPE_ITEM,
          layoutMode: "packery"
        };
        const options = window._.merge(defaultOptions, userOptions);
        const isotope = new window.Isotope(masonryItem, options);

        //--------- filter -----------------
        const filterElement = document.querySelector(Selector.DATA_FILER_NAV);
        filterElement?.addEventListener("click", function (e) {
          const item = e.target.dataset.filter;
          isotope.arrange({
            filter: item
          });
          document.querySelectorAll(Selector.DATA_FILTER).forEach(el => {
            el.classList.remove(ClassName.ACTIVE);
          });
          e.target.classList.add(ClassName.ACTIVE);
        });
        //---------- filter end ------------

        return isotope;
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                 Glightbox                                */
/* -------------------------------------------------------------------------- */

const glightboxInit = () => {
  if (window.GLightbox) {
    window.GLightbox({
      selector: "[data-gallery]"
    });
  }
};

// import utils from "./utils";
/*-----------------------------------------------
|   Top navigation opacity on scroll
-----------------------------------------------*/
const navbarInit = () => {
  const navbar = document.querySelector("[data-navbar-on-scroll]");
  const headerOverlay = document.querySelector(".header-overlay");
  const headerIndicator = document.querySelector(".header-indicator-down");
  const headerText = document.querySelector(".header-text");
  if (navbar) {
    const windowHeight = window.innerHeight;
    const handleAlpha = () => {
      const scrollTop = window.pageYOffset;
      let alpha = scrollTop / windowHeight * 2;
      let beta = scrollTop / windowHeight;
      alpha >= 1 && (alpha = 1);
      navbar.style.backgroundColor = `rgba(54, 40, 138, ${alpha})`;
      headerOverlay.style.backgroundColor = `rgba(54, 40, 138, ${alpha})`;
      navbar.style.borderColor = `rgba(255, 255, 255, ${0.15 - alpha})`;
      // Reduce header content opacity on scroll
      alpha >= 1 && (alpha = 1);
      if (headerIndicator) {
        headerIndicator.style.opacity = 1 - beta;
        headerText.style.opacity = 1 - beta;
      }
    };
    handleAlpha();
    document.addEventListener("scroll", () => handleAlpha());

    // Top navigation background toggle on mobile
    navbar.addEventListener("show.bs.collapse", e => {
      e.currentTarget.classList.toggle("bg-dark");
    });
    navbar.addEventListener("hide.bs.collapse", e => {
      e.currentTarget.classList.toggle("bg-dark");
    });
  }
};

/*-----------------------------------------------
|   Inline Player [plyr]
-----------------------------------------------*/

const plyrInit = () => {
  if (window.Plyr) {
    const plyrs = document.querySelectorAll(".player");
    plyrs.forEach(plyr => {
      const userOptions = utils.getData(plyr, "options");
      const defaultOptions = {
        captions: {
          active: true
        }
      };
      const options = window._.merge(defaultOptions, userOptions);
      return new window.Plyr(plyr, options);
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                   Popover                                  */
/* -------------------------------------------------------------------------- */

const popoverInit = () => {
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(popoverTriggerEl => {
    return new window.bootstrap.Popover(popoverTriggerEl);
  });
};

/* -------------------------------------------------------------------------- */
/*                                  Preloader                                 */
/* -------------------------------------------------------------------------- */

const preloaderInit = () => {
  const bodyElement = document.querySelector("body");
  window.imagesLoaded(bodyElement, () => {
    const preloader = document.querySelector("[data-preloader]");
    preloader?.classList.add("loaded");
    setTimeout(() => {
      preloader?.remove();
    }, 900);
  });
};

/* -------------------------------------------------------------------------- */
/*                               Progressbar JS                               */
/* -------------------------------------------------------------------------- */

/*
  global ProgressBar
*/
const progressBar = () => {
  const {
    merge
  } = window._;

  // progressbar.js@1.0.0 version is used
  // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

  /*-----------------------------------------------
  |   Progress Circle
  -----------------------------------------------*/
  const progresCircle = document.querySelectorAll("[data-progress-circle]");
  if (progresCircle.length) {
    progresCircle.forEach(item => {
      const userOptions = utils.getData(item, "options");
      const getDefaultOptions = () => ({
        strokeWidth: 1.5,
        trailWidth: 1.4,
        trailColor: "#eee",
        color: "#333",
        easing: "easeInOut",
        duration: 3000,
        svgStyle: {
          "stroke-linecap": "round",
          display: "block",
          width: "100%"
        },
        text: {
          autoStyleContainer: false
        },
        // Set default step function for all animate calls
        step: (state, circle) => {
          // Change stroke color during progress
          // circle.path.setAttribute('stroke', state.color);

          // Change stroke width during progress
          // circle.path.setAttribute('stroke-width', state.width);

          const percentage = Math.round(circle.value() * 100);
          circle.setText(`<span class='value'>${percentage}<b>%</b></span> <span>${userOptions.text || ""}</span>`);
        }
      });
      const options = merge(getDefaultOptions(), userOptions);
      const bar = new ProgressBar.Circle(item, options);
      const linearGradient = `<defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color='#1970e2' />
          <stop offset="100%" stop-color='#4695ff' />
        </linearGradient>
      </defs>`;
      bar.svg.insertAdjacentHTML("beforeEnd", linearGradient);
      let playProgressTriggered = false;
      const progressCircleAnimation = () => {
        if (!playProgressTriggered) {
          if (utils.isScrolledIntoView(item).partial) {
            bar.animate(options.progress / 100);
            playProgressTriggered = true;
          }
        }
        return playProgressTriggered;
      };
      progressCircleAnimation();
      window.addEventListener("scroll", () => {
        progressCircleAnimation();
      });
    });
  }

  /*-----------------------------------------------
  |   Progress Line
  -----------------------------------------------*/

  const progresLine = document.querySelectorAll("[data-progress-line]");
  if (progresLine.length) {
    progresLine.forEach(item => {
      const userOptions = utils.getData(item, "options");
      const getDefaultOptions = () => ({
        strokeWidth: 1,
        trailWidth: 1.4,
        trailColor: "#5b66c5",
        color: "#eee",
        easing: "easeInOut",
        duration: 3000,
        svgStyle: {
          "stroke-linecap": "round",
          "border-radius": "0.125rem",
          height: "0.25rem",
          width: "100%"
        },
        text: {
          style: {
            transform: null,
            color: "light"
          },
          autoStyleContainer: false,
          value: "0"
        },
        // Set default step function for all animate calls
        step: (state, line) => {
          // Change stroke color during progress
          // circle.path.setAttribute('stroke', state.color);

          // Change stroke width during progress
          // circle.path.setAttribute('stroke-width', state.width);

          const percentage = Math.round(line.value() * 100);
          line.setText(`<span class='value'>${percentage}<b>%</b></span> <span>${userOptions.text || ""}</span>`);
        }
      });
      const options = merge(getDefaultOptions(), userOptions);
      const bar = new ProgressBar.Line(item, options);
      const linearGradient = `<defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color='#1970e2' />
          <stop offset="100%" stop-color='#4695ff' />
        </linearGradient>
      </defs>`;
      bar.svg.insertAdjacentHTML("beforeEnd", linearGradient);
      let playProgressTriggered = false;
      const progressCircleAnimation = () => {
        if (!playProgressTriggered) {
          if (utils.isScrolledIntoView(item).partial) {
            bar.animate(options.progress / 100);
            playProgressTriggered = true;
          }
        }
        return playProgressTriggered;
      };
      progressCircleAnimation();
      window.addEventListener("scroll", () => {
        progressCircleAnimation();
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                         Bootstrap Animated Progress                        */
/* -------------------------------------------------------------------------- */

const progressAnimationToggle = () => {
  const animatedProgress = document.querySelectorAll("[data-progress-animation]");
  animatedProgress.forEach(progress => {
    progress.addEventListener("click", e => {
      const progressID = utils.getData(e.currentTarget, "progressAnimation");
      const $progress = document.getElementById(progressID);
      $progress.classList.toggle("progress-bar-animated");
    });
  });
};

/* -------------------------------------------------------------------------- 
|                                 Rellax js                                 
/* -------------------------------------------------------------------------- */

const rellaxInit = () => {
  return window.Rellax && new window.Rellax("[data-parallax]", {
    speed: -3
  });
};

/*-----------------------------------------------
|  Swiper
-----------------------------------------------*/
const swiperInit = () => {
  const Selector = {
    DATA_SWIPER: "[data-swiper]",
    DATA_ZANIM_TIMELINE: "[data-zanim-timeline]",
    IMG: "img",
    SWIPER_NAV: ".swiper-nav",
    SWIPER_BUTTON_NEXT: ".swiper-button-next",
    SWIPER_BUTTON_PREV: ".swiper-button-prev"
  };
  const DATA_KEY = {
    SWIPER: "swiper"
  };
  const Events = {
    SLIDE_CHANGE: "slideChange"
  };
  const swipers = document.querySelectorAll(Selector.DATA_SWIPER);
  if (swipers.length) {
    swipers.forEach(swiper => {
      const options = utils.getData(swiper, DATA_KEY.SWIPER);
      const thumbsOptions = options.thumb;
      let thumbsInit;
      if (thumbsOptions) {
        const thumbImages = swiper.querySelectorAll(Selector.IMG);
        let slides = "";
        thumbImages.forEach(img => {
          slides += `
          <div class='swiper-slide '>
            <img class='img-fluid rounded mt-1' src=${img.src} alt=''/>
          </div>
        `;
        });
        const thumbs = document.createElement("div");
        thumbs.setAttribute("class", "swiper thumb");
        thumbs.innerHTML = `<div class='swiper-wrapper'>${slides}</div>`;
        if (thumbsOptions.parent) {
          const parent = document.querySelector(thumbsOptions.parent);
          parent.parentNode.appendChild(thumbs);
        } else {
          swiper.parentNode.appendChild(thumbs);
        }
        thumbsInit = new window.Swiper(thumbs, thumbsOptions);
      }
      const swiperNav = swiper.querySelector(Selector.SWIPER_NAV);
      const newSwiper = new window.Swiper(swiper, {
        navigation: {
          nextEl: swiperNav?.querySelector(".swiper-button-next"),
          prevEl: swiperNav?.querySelector(".swiper-button-prev")
        },
        pagination: {
          el: swiper.querySelector(".swiper-pagination"),
          type: "bullets",
          clickable: true
        },
        ...options,
        // pagination: {
        //   el: swiper.querySelector(".swiper-pagination"),
        //   type: "bullets",
        //   clickable: true,
        // },
        thumbs: {
          swiper: thumbsInit
        },
        on: {
          init: () => {
            const timelineElements = swiper.querySelectorAll(Selector.DATA_ZANIM_TIMELINE);
            timelineElements.forEach(el => {
              window.zanimation(el, animation => {
                setTimeout(() => {
                  animation.play();
                }, 400);
              });
            });
          }
        }
      });

      //- zanimation effect start
      if (swiper) {
        newSwiper.on(Events.SLIDE_CHANGE, () => {
          const timelineElements = swiper.querySelectorAll(Selector.DATA_ZANIM_TIMELINE);
          timelineElements.forEach(el => {
            window.zanimation(el, animation => {
              setTimeout(() => {
                animation.play();
              }, 400);
            });
          });
        });
      }
      //- zanimation effect end
    });
  }
};

/* eslint-disable no-param-reassign */

/*-----------------------------------------------
|  Testimonial Swiper
-----------------------------------------------*/

const setBgImage = (el, testimonialAvatar) => {
  const avatar = utils.getData(el.querySelector('[data-avatar]'), 'avatar');
  testimonialAvatar.style.backgroundImage = `url(${avatar})`;
};
const testimonialSwiperInit = () => {
  const testimonials = document.querySelectorAll('.testimonial');
  if (testimonials.length) {
    testimonials.forEach(testimonial => {
      const testimonialSlider = testimonial.querySelector('.testimonial-slider');
      if (testimonialSlider) {
        const testimonialAvatar = testimonial.querySelector('.testimonial-avatar');
        if (testimonialAvatar) {
          setBgImage(testimonial, testimonialAvatar);
        }
        const {
          swiper
        } = testimonialSlider;
        if (swiper) {
          swiper.on('slideChange', e => {
            const slider = e.slides[e.snapIndex];
            setBgImage(slider, testimonialAvatar);
          });
        }
      }
    });
  }
};

/*-----------------------------------------------
|  Thumbnail Grid
-----------------------------------------------*/
const initNavBtns = grid => {
  const navBtns = grid.querySelectorAll("[data-thumbnail-grid-nav]");
  navBtns.forEach(navBtn => {
    const target = utils.getData(navBtn, "grid-target");
    if (target === "#!") {
      navBtn.classList.add("disabled");
    }
    navBtn.addEventListener("click", () => {
      if (target !== "#!") {
        window.bootstrap.Collapse.getOrCreateInstance(target).show();
      }
    });
  });
};
const initCloseBtn = content => {
  const closeBtn = content.querySelector(".thumbnail-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      window.bootstrap.Collapse.getOrCreateInstance(content).hide();
    });
  }
};
const thumbnailgridInit = () => {
  const thumbnailGridContainer = document.querySelectorAll(".thumbnail-grid-container");
  if (thumbnailGridContainer.length) {
    thumbnailGridContainer.forEach(thumbnailGrid => {
      const thumbnailGridContents = thumbnailGrid.querySelectorAll(".thumbnail-grid-content");
      initNavBtns(thumbnailGrid);
      thumbnailGridContents.forEach(content => {
        const gridderItem = content.closest(".thumbnail-grid-item");
        initCloseBtn(content);
        content.addEventListener("show.bs.collapse", () => {
          const marginBottom = window.getComputedStyle(content).height;
          gridderItem.style.marginBottom = marginBottom;
          gridderItem.style.zIndex = 11;
          setTimeout(() => {
            thumbnailGrid.classList.add("hasOpenItems");
          }, 1);
        });
        content.addEventListener("hide.bs.collapse", () => {
          gridderItem.style.marginBottom = "unset";
          gridderItem.style.zIndex = 10;
          thumbnailGrid.classList.remove("hasOpenItems");
        });
      });
      window.addEventListener("resize", () => {
        const collapse = thumbnailGrid.querySelector(".collapse.show");
        if (collapse) {
          const gridderItem = collapse.closest(".thumbnail-grid-item");
          gridderItem.style.marginBottom = window.getComputedStyle(collapse).height;
        }
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                    Toast                                   */
/* -------------------------------------------------------------------------- */

const toastInit = () => {
  const toastElList = [].slice.call(document.querySelectorAll('.toast'));
  toastElList.map(toastEl => new window.bootstrap.Toast(toastEl));
  const liveToastBtn = document.getElementById('liveToastBtn');
  if (liveToastBtn) {
    const liveToast = new window.bootstrap.Toast(document.getElementById('liveToast'));
    liveToastBtn.addEventListener('click', () => {
      liveToast && liveToast.show();
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                   Tooltip                                  */
/* -------------------------------------------------------------------------- */
const tooltipInit = () => {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl, {
    trigger: 'hover'
  }));
};

/* -------------------------------------------------------------------------- */
/*                                 Typed Text                                 */
/* -------------------------------------------------------------------------- */

const typedTextInit = () => {
  const typedTexts = document.querySelectorAll("[data-typed-text]");
  if (typedTexts.length && window.Typed) {
    typedTexts.forEach(typedText => {
      return new window.Typed(typedText, {
        strings: utils.getData(typedText, "typedText"),
        typeSpeed: 100,
        loop: true,
        backDelay: 1500
      });
    });
  }
};

/*-----------------------------------------------
|                 Zanimation
-----------------------------------------------*/

/*
global CustomEase, gsap
*/
CustomEase.create('CubicBezier', '.77,0,.18,1');

/*-----------------------------------------------
|   Global Functions
-----------------------------------------------*/
const filterBlur = () => {
  let blur = 'blur(5px)';
  const isIpadIphoneMacFirefox = (window.is.ios() || window.is.mac()) && window.is.firefox();
  if (isIpadIphoneMacFirefox) {
    blur = 'blur(0px)';
  }
  return blur;
};
const zanimationEffects = {
  default: {
    from: {
      opacity: 0,
      y: 70
    },
    to: {
      opacity: 1,
      y: 0
    },
    ease: 'CubicBezier',
    duration: 0.8,
    delay: 0
  },
  'slide-down': {
    from: {
      opacity: 0,
      y: -70
    },
    to: {
      opacity: 1,
      y: 0
    },
    ease: 'CubicBezier',
    duration: 0.8,
    delay: 0
  },
  'slide-left': {
    from: {
      opacity: 0,
      x: 70
    },
    to: {
      opacity: 1,
      x: 0
    },
    ease: 'CubicBezier',
    duration: 0.8,
    delay: 0
  },
  'slide-right': {
    from: {
      opacity: 0,
      x: -70
    },
    to: {
      opacity: 1,
      x: 0
    },
    ease: 'CubicBezier',
    duration: 0.8,
    delay: 0
  },
  'zoom-in': {
    from: {
      scale: 0.9,
      opacity: 0,
      filter: filterBlur()
    },
    to: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)'
    },
    delay: 0,
    ease: 'CubicBezier',
    duration: 0.8
  },
  'zoom-out': {
    from: {
      scale: 1.1,
      opacity: 1,
      filter: filterBlur()
    },
    to: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)'
    },
    delay: 0,
    ease: 'CubicBezier',
    duration: 0.8
  },
  'zoom-out-slide-right': {
    from: {
      scale: 1.1,
      opacity: 1,
      x: -70,
      filter: filterBlur()
    },
    to: {
      scale: 1,
      opacity: 1,
      x: 0,
      filter: 'blur(0px)'
    },
    delay: 0,
    ease: 'CubicBezier',
    duration: 0.8
  },
  'zoom-out-slide-left': {
    from: {
      scale: 1.1,
      opacity: 1,
      x: 70,
      filter: filterBlur()
    },
    to: {
      scale: 1,
      opacity: 1,
      x: 0,
      filter: 'blur(0px)'
    },
    delay: 0,
    ease: 'CubicBezier',
    duration: 0.8
  },
  'blur-in': {
    from: {
      opacity: 0,
      filter: filterBlur()
    },
    to: {
      opacity: 1,
      filter: 'blur(0px)'
    },
    delay: 0,
    ease: 'CubicBezier',
    duration: 0.8
  }
};
if (utils.isRTL()) {
  Object.keys(zanimationEffects).forEach(key => {
    if (zanimationEffects[key].from.x) {
      zanimationEffects[key].from.x = -zanimationEffects[key].from.x;
    }
  });
}
const zanimation = (el, callback) => {
  const Selector = {
    DATA_ZANIM_TIMELINE: '[data-zanim-timeline]',
    DATA_KEYS: '[data-zanim-xs], [data-zanim-sm], [data-zanim-md], [data-zanim-lg], [data-zanim-xl]'
  };
  const DATA_KEY = {
    DATA_ZANIM_TRIGGER: 'data-zanim-trigger'
  };

  /*-----------------------------------------------
   |   Get Controller
   -----------------------------------------------*/
  let controllerZanim;
  const currentBreakpointName = utils.getCurrentScreenBreakpoint().currentBreakpoint;
  const currentBreakpointVal = utils.getCurrentScreenBreakpoint().breakpointStartVal;
  const getController = element => {
    let options = {};
    let controller = {};
    if (element.hasAttribute(`data-zanim-${currentBreakpointName}`)) {
      controllerZanim = `zanim-${currentBreakpointName}`;
    } else {
      /*-----------------------------------------------
         |   Set the mobile first Animation
         -----------------------------------------------*/
      let animationBreakpoints = [];
      const attributes = element.getAttributeNames();
      attributes.forEach(attribute => {
        if (attribute !== DATA_KEY.DATA_ZANIM_TRIGGER && attribute.startsWith('data-zanim-')) {
          const breakPointName = attribute.split('data-zanim-')[1];
          if (utils.breakpoints[breakPointName] < currentBreakpointVal) {
            animationBreakpoints.push({
              name: breakPointName,
              size: utils.breakpoints[breakPointName]
            });
          }
        }
      });
      controllerZanim = undefined;
      if (animationBreakpoints.length !== 0) {
        animationBreakpoints = animationBreakpoints.sort((a, b) => a.size - b.size);
        const activeBreakpoint = animationBreakpoints.pop();
        controllerZanim = `zanim-${activeBreakpoint.name}`;
      }
    }
    const userOptions = utils.getData(element, controllerZanim);
    controller = window._.merge(options, userOptions);
    if (!(controllerZanim === undefined)) {
      if (userOptions.animation) {
        options = zanimationEffects[userOptions.animation];
      } else {
        options = zanimationEffects.default;
      }
    }
    if (controllerZanim === undefined) {
      options = {
        delay: 0,
        duration: 0,
        ease: 'Expo.easeOut',
        from: {},
        to: {}
      };
    }

    /*-----------------------------------------------
      |   populating the controller
      -----------------------------------------------*/
    controller.delay || (controller.delay = options.delay);
    controller.duration || (controller.duration = options.duration);
    controller.from || (controller.from = options.from);
    controller.to || (controller.to = options.to);
    if (controller.ease) {
      controller.to.ease = controller.ease;
    } else {
      controller.to.ease = options.ease;
    }
    return controller;
  };
  /*-----------------------------------------------
   |   End of Get Controller
   -----------------------------------------------*/

  /*-----------------------------------------------
   |   For Timeline
   -----------------------------------------------*/

  const zanimTimeline = el.hasAttribute('data-zanim-timeline');
  if (zanimTimeline) {
    const timelineOption = utils.getData(el, 'zanim-timeline');
    const timeline = gsap.timeline(timelineOption);
    const timelineElements = el.querySelectorAll(Selector.DATA_KEYS);
    timelineElements.forEach(timelineEl => {
      const controller = getController(timelineEl);
      timeline.fromTo(timelineEl, controller.duration, controller.from, controller.to, controller.delay).pause();
      window.imagesLoaded(timelineEl, callback(timeline));
    });
  } else if (!el.closest(Selector.DATA_ZANIM_TIMELINE)) {
    /*-----------------------------------------------
      |   For single elements outside timeline
      -----------------------------------------------*/
    const controller = getController(el);
    callback(gsap.fromTo(el, controller.duration, controller.from, controller.to).delay(controller.delay).pause());
  }
  callback(gsap.timeline());
};

/*-----------------------------------------------
|    Zanimation Init
-----------------------------------------------*/

const zanimationInit = () => {
  const Selector = {
    DATA_ZANIM_TRIGGER: '[data-zanim-trigger]',
    DATA_ZANIM_REPEAT: '[zanim-repeat]'
  };
  const DATA_KEY = {
    DATA_ZANIM_TRIGGER: 'data-zanim-trigger'
  };
  const Events = {
    SCROLL: 'scroll'
  };

  /*-----------------------------------------------
   |   Triggering zanimation when the element enters in the view
   -----------------------------------------------*/
  const triggerZanimation = () => {
    const triggerElement = document.querySelectorAll(Selector.DATA_ZANIM_TRIGGER);
    triggerElement.forEach(el => {
      if (utils.isElementIntoView(el) && el.hasAttribute(DATA_KEY.DATA_ZANIM_TRIGGER)) {
        zanimation(el, animation => animation.play());
        if (!document.querySelector(Selector.DATA_ZANIM_REPEAT)) {
          el.removeAttribute(DATA_KEY.DATA_ZANIM_TRIGGER);
        }
      }
    });
  };
  triggerZanimation();
  window.addEventListener(Events.SCROLL, () => triggerZanimation());
};
const gsapAnimation = {
  zanimationInit,
  zanimation
};

/* -------------------------------------------------------------------------- */
/*                            Theme Initialization                            */
/* -------------------------------------------------------------------------- */
docReady(detectorInit);
docReady(tooltipInit);
docReady(progressBar);
docReady(popoverInit);
docReady(toastInit);
docReady(navbarInit);
docReady(plyrInit);
docReady(initMap);
docReady(countupInit);
docReady(progressAnimationToggle);
docReady(swiperInit);
docReady(isotopeInit);
docReady(typedTextInit);
docReady(formInit);
docReady(rellaxInit);
docReady(bigPictureInit);
docReady(dropdownOnHover);
docReady(dropdownMenuInit);
docReady(glightboxInit);
docReady(bgPlayerInit);
docReady(zanimationInit);
docReady(hoverDirInit);
docReady(thumbnailgridInit);
docReady(testimonialSwiperInit);
docReady(BackToTopInit);
docReady(preloaderInit);
//# sourceMappingURL=theme.js.map
