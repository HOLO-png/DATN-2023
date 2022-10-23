import React, { Component } from "react";
import { Carousel, Button } from "antd";
import { IMAGE_BASE_URL } from "../../utils/constants";

class MainCarousel extends Component {
  onChange = (a, b, c) => { };
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
    };

    return (
      <Carousel {...settings} autoplay>
        {this.props.data?.banners &&
          this.props.data.banners.map((banner, i) => {
            let linkPhoto = '';
            if (banner.link.indexOf("http://") == 0 || banner.link.indexOf("https://") == 0) {
              linkPhoto = IMAGE_BASE_URL + '/' + banner.bannerPhoto
            }
            linkPhoto = banner.bannerPhoto
            
            return (
              banner.link ?
                  <a href={banner.link} target="_blank" className="img-text" key={i}>
                    <div className="carousel-text"></div>
                    <img src={linkPhoto} alt="banner" />
                  </a>
                 : (
                  <div className="img-text" key={i}>
                    <div className="carousel-text"></div>
                    <img src={linkPhoto} alt="banner" />
                  </div>
                )
            );
          })}
      </Carousel>
    );
  }
}

export default MainCarousel;
