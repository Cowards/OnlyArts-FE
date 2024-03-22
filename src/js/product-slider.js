document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide( '.splide-product.splide-product', {
        type   : 'loop',
        perPage: 5,
        breakpoints: {
            1140: {
                perPage: 4,
            },
            920: {
                perPage: 3,
            },
            695: {
                perPage: 2,
              },
            475: {
                perPage: 1,
            },
          },
      } );
      
      splide.mount();
  } );