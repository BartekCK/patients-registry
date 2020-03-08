import React from "react";
import ImgBackground from '../../resources/img/background.png'


export class Home extends React.Component {

    render() {
        return (
            <div className='home-container'>
                <div className='ImgDiv'>
                    <img src={ImgBackground} alt='medic-app'/>
                </div>
                <div className='TextDiv'>
                    <h1>Pomóż komuś, a może uratujesz samego siebie</h1>
                    <p>Za pomocą jednego kliknięcia znajdź osoby potrzebujące twojej pomocy</p>
                    <button>Szukaj</button>
                </div>
            </div>)
    }
}
