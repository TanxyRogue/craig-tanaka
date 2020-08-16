function gifLoader() {
    // this method loads the portfolio gifs in the background and when the gifs are finished loading replaces the placeholder images with the gifs
    // Note: the method assumes the placeholder image and the GIf are name the same just the extension is different
    var imgTags = document.querySelectorAll('.project-img-gif');

    imgTags.forEach((el,) => {
        
        var imgSource = el.getAttribute('src');
        imgSource = imgSource.replace(/\.[^/.]+$/, ".gif"); // removes placeholder extension and replaces it with 'gif' extension

        var newImg = new Image();

        newImg.addEventListener('load', () => {
            el.src = newImg.src
        })
        newImg.src = imgSource;
    })
}
gifLoader();


// #region Dom-Elements
    const navbarOverlay = document.querySelector('.nav-screen-overlay');
    const navbarLst = document.querySelector('.nav-list');
// #endregion

// #region Site-Global-Variables
    let navMenuOpen = false;
// #endregion

// #region Event-Listeners
    document.querySelector('.nav-drawer-btn').addEventListener('click', navMenuToggler,false);
    document.querySelector('.nav-screen-overlay').addEventListener('click', navMenuToggler,false);
    document.querySelectorAll('.nav-link').forEach((el)=>{
        el.addEventListener('click', navMenuToggler ,false)
    })
// #endregion

// #region functions
    function navMenuToggler() {
        
        if(navMenuOpen){
            navbarOverlay.classList.add('hidden');
            navbarLst.classList.add('nav-list-hidden');
            navMenuOpen = false;
        }
        else if(!navMenuOpen){
            navbarOverlay.classList.remove('hidden');
            navbarLst.classList.remove('nav-list-hidden');
            navMenuOpen = true;
        }
    }
// #endregion