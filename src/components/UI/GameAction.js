import React from 'react';

function importAll(r) {
    return r.keys().map(r);
}
  
const images = importAll(require.context('../../assets/actions', false, /\.(png|jpe?g|svg)$/));

const Flag = (props) => {
    let action = props.action ? props.action: 'noflag';
    let image = images.filter(image => image.indexOf(action) > 0)[0];
    return (
        <img style={{ height: '2em', marginTop: '0.1em', marginLeft: '0.4em'}} alt={props.action} src={image} />
    )
}

export default Flag;