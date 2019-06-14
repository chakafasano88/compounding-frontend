import React from 'react';
import Link from 'next/link';

const KeyPressLink = ({ id, href, className, text }) => {
    return (
        <Link href={href}>
            <a id={id} className="grow"><span className="navigation__letter sm">{text}</span></a>
        </Link>
    );
};

export default KeyPressLink;