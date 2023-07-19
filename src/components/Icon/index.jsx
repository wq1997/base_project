import React from 'react';
import classnames from 'classnames';

const scriptElem = document.createElement('script');
scriptElem.src = '//at.alicdn.com/t/c/font_969065_lxd84qjs8ni.js';
document.body.appendChild(scriptElem);

function Icon({ className, type, ...restProps }) {
  return (
    <svg
      className={classnames(className)}
      aria-hidden="true"
      {...restProps}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  );
}

export default Icon;

