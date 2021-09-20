import React from 'react'

const Progressbar = ({ bgcolor, progress, height }) => {

    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: 50
    }

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor:'#fff4e3',
        //backgroundColor: bgcolor,
        borderRadius: 40,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems : 'center'
    }

    const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900,
        fontSize : '20px'
    }

    
    return (
        <div style={Parentdiv}>
            <div style={Childdiv}>
                <span style={progresstext}>{`${progress}%`}</span>
            </div>
        </div>
    )
}

export default Progressbar;