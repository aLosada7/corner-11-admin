import React from 'react';
function importAll(r) {
    return r.keys().map(r);
}
  
const images = importAll(require.context('../../assets/flags', false, /\.(png|jpe?g|svg)$/));

const Flag = (props) => {
    let country = props.country ? props.country.toLowerCase() : 'noflag';
    let image = images.filter(image => image.indexOf(country) > 0)[0];
    return (
        <img style={{ height: '1em', marginTop: '0.1em', marginLeft: '0.4em'}} alt={props.country} src={image} />
    )
}

export default Flag;