import React from 'react';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import { orange, apple, fish } from "../../image"

const items = [
    { name: 'Orange0', image: orange, bgColor: '#FDEBD0' },
    { name: 'Apple0', image: apple, bgColor: '#FADBD8' },
    { name: 'Fish0', image: fish, bgColor: '#D1F2FB' },
    { name: 'Orange1', image: orange, bgColor: '#FDEBD0' },
    { name: 'Apple1', image: apple, bgColor: '#FADBD8' },
    { name: 'Fish1', image: fish, bgColor: '#D1F2FB' },
    { name: 'Orange2', image: orange, bgColor: '#FDEBD0' },
    { name: 'Apple2', image: apple, bgColor: '#FADBD8' },
    { name: 'Fish2', image: fish, bgColor: '#D1F2FB' }
  ];
  
  class ItemsCarousel extends React.Component {
    componentDidMount() {
      this.flickity = new Flickity(this.carousel, {
        cellAlign: 'left',
        wrapAround: true,
        pageDots: false,
        groupCells: 1 // groups items into sets based on width
      });
    }
  
    componentWillUnmount() {
      this.flickity.destroy();
    }
  
    render() {
      return (
        <div className="p-4" ref={el => this.carousel = el}>
          {items.map((item, index) => (
            <div key={index} className="rounded-2 me-3 p-2" style={{ backgroundColor: item.bgColor }}>
              <img src={item.image} alt={item.name} className='w-50 mb-1' />
              <h3 className='text-center'>{item.name}</h3>
            </div>
          ))}
        </div>
      );
    }
  }
  
  export default ItemsCarousel;