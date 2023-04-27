$(function() {
    $(".menu-btn").on("click", () => {
        $(".links").toggleClass("hidden");
    });

    $(".links a").on("click", function() {
        $(".links a").removeClass("active");
        $(this).addClass("active");
    });

    $(".settings-box .btn").on("click", function() {
        if(!$(".popup-gallery").hasClass("active")) {
            $(".settings-box").toggleClass("hide");
            $(".settings-box i").toggleClass("active");
        }
    });

    let mainColor;
    let colorsBg = document.querySelectorAll(".colors li");
    if(localStorage.mainColor) {
        mainColor = localStorage.mainColor;
        document.documentElement.style.setProperty("--main-color", mainColor);
        colorsBg.forEach((li) => {
            if(li.dataset.color == mainColor) {
                li.classList.add("active");
            } else {
                li.classList.remove("active");
            }
        });
    }
    $(".colors li").on("click", function() {
        $(".colors li").removeClass("active");
        $(this).addClass("active");
        mainColor = this.dataset.color;
        document.documentElement.style.setProperty("--main-color", mainColor);
        localStorage.setItem("mainColor", mainColor);
    });
    // $(".page").on("click", function() {
    //     if($(this).hasClass("active")) {
    //         console.log(1);
    //         $(".settings-box").addClass("hide");        
    //     }
    // });
    let imgs = ["henning-witzel-ukvgqriuOgo-unsplash.jpg","kevin-young--icmOdYWXuQ-unsplash.jpg","konstantin-kleine-V1NVvXmO_dk-unsplash.jpg", "kevin-young--icmOdYWXuQ-unsplash.jpg", "kyle-johnson-Aq7id0ZjEW4-unsplash.jpg"];
    let randomlyBg, randomly;
    if(localStorage.randomly) {
        randomly = JSON.parse(localStorage.randomly);
        if(!randomly) {
            $(".random-bg span").toggleClass("active");
        }
    } else {
        randomly = true;
    }
    checkRandomlyChangeBG(randomly);

    $(".random-bg span").on("click", function() {
        $(".random-bg span").toggleClass("active");
        if(this.dataset.random == "no") {
            randomly = false;
        } else {
            randomly = true;
        }
        checkRandomlyChangeBG(randomly);
        localStorage.setItem("randomly", randomly);
    });

    let progress = document.querySelectorAll(".progress span");
    let lineContent = document.querySelectorAll(".timelines .content");

    $(window).on("scroll", function() {
        if($(window).scrollTop() >= $(".skills").offset().top) {
            progress.forEach((prog) => {
                prog.style.width = prog.dataset.progress;
            });
        }
        if($(window).scrollTop() >= $(".timelines").offset().top) {
            lineContent.forEach((cont) => {
                $(cont).show(100);
            });
        }
    });

    let imgsGallery = document.querySelectorAll(".gallery img");
    let imgsArray = [...imgsGallery];

    $(".gallery .links li").on("click", function() {
        $(".gallery .links li").removeClass("active");
        $(this).addClass("active");
        generateGalleryImgs($(this).html());
    });

    $(".gallery img").on("click", function() {
        if(!$(".popup-gallery").hasClass("active")) {
            generateGalleryPopup(this);
            $(".popup-gallery").addClass("active");
            $(".page").css({
                "opacity": "30%"
            });
        }
    });

    $(".popup-gallery .close").on("click", function() {
        $(".popup-gallery").removeClass("active");
        $(".page").css({
            "opacity": "100%"
        });
    });

    let contentTimlines = document.querySelectorAll(".timelines .content, .timelines .year, .timelines span");
    contentTimlines.forEach((el) => {
        el.style.top = el.dataset.position;
    });
    
    let statusBullets;
    if(localStorage.statusBullets) {
        statusBullets = JSON.parse(localStorage.statusBullets);
        if(!statusBullets) {
            $(".show-bullets-nav span").toggleClass("active");
        }
    } else {
        statusBullets = true;
    }
    statusBulletsFun(statusBullets);

    $(".show-bullets-nav span").on("click", function() {
        $(".show-bullets-nav span").toggleClass("active");
        if($(".show-bullets-nav span:first-child").hasClass("active")) {
            statusBullets = true;
        } else {
            statusBullets = false;
        }
        localStorage.setItem("statusBullets", statusBullets);
        statusBulletsFun(statusBullets);
    });

    $(".reset span").on("click", function() {
        localStorage.clear();
        location.reload();
    });

    function checkRandomlyChangeBG(value) {
        if(!value) {
            clearInterval(randomlyBg); 
        } else {
            randomlyBg = setInterval(() => {
                let randomImg = imgs[Math.floor(Math.random() * imgs.length)]; 
                $(".landing").css("background", `url(../../../src/assets/images/${randomImg}) center center /cover`);
            }, 4000);
        }
    }

    function generateGalleryImgs(value) {
        $(".gallery .imgs").html("");
        if(value == "all") {
            imgsArray.forEach((img) => {
                $(".gallery .imgs").append(img);
            });
        } else {
            imgsArray.forEach((img) => {
                if(value == img.dataset.type) {
                    $(".gallery .imgs").append(img);
                }
            });
        }
    }

    function generateGalleryPopup(img) {
        let popup = `<h2>${img.dataset.type}</h2>
        <img src=${img.src} alt="">`;
        $(".popup-gallery .content").html(popup);
    }

    function statusBulletsFun(value) { 
        if(value) {
            $(".bullets-nav").show(200);
        } else {
            $(".bullets-nav").hide(200);
        }
    }
});