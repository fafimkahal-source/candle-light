/* =========================================================
   CANDLE LIGHT
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       WEBSITE SETTINGS FROM SUPABASE
    ===================================================== */

    const WEBSITE_SUPABASE_URL =
        "https://tdvjmiksxarhrtbahomu.supabase.co";

    const WEBSITE_SUPABASE_KEY =
        "sb_publishable_ExRGky7tnpPLJfoSmR4Z2A_c87JJlLX";

    const websiteSupabase =
        window.supabase.createClient(
            WEBSITE_SUPABASE_URL,
            WEBSITE_SUPABASE_KEY
        );


    async function loadWebsiteSettings() {

        try {

            const {
                data,
                error
            } = await websiteSupabase
                .from("website_settings")
                .select("*")
                .order("id", {
                    ascending: true
                })
                .limit(1)
                .maybeSingle();


            if (error) {

                console.error(
                    "Website settings error:",
                    error
                );

                return;
            }


            if (!data) {

                console.warn(
                    "No website settings found."
                );

                return;
            }


            console.log(
                "Website settings loaded:",
                data
            );

/* =================================================
   HERO
================================================= */

const heroEyebrow =
    document.getElementById("heroEyebrow");

const heroTitle =
    document.getElementById("siteNameHero");

const heroDescription =
    document.getElementById("heroDescription");

const heroButton =
    document.getElementById("heroButton");


if (heroEyebrow) {
    heroEyebrow.textContent =
        data.hero_eyebrow ||
        "LUXURY LIGHTING & CUSTOM DESIGN";
}


if (heroTitle) {
    heroTitle.textContent =
        data.hero_title ||
        data.company_name ||
        "CANDLE LIGHT";
}


if (heroDescription) {
    heroDescription.textContent =
        data.hero_description ||
        "Elegant chandeliers, custom designs and lighting solutions created to transform your space with beauty and character.";
}


if (heroButton) {
    heroButton.textContent =
        data.hero_button_text ||
        "Explore Collection";
}



/* =================================================
   ABOUT
================================================= */

const aboutEyebrow =
    document.getElementById("aboutEyebrow");

const aboutTitle =
    document.getElementById("aboutTitle");

const aboutDescription =
    document.getElementById("aboutDescription");

const aboutImage =
    document.getElementById("aboutImage");


if (aboutEyebrow) {
    aboutEyebrow.textContent =
        data.about_eyebrow ||
        "OUR STORY";
}


if (aboutTitle) {

    const title =
        data.about_title ||
        "From One Beginning To Three Branches";

    aboutTitle.textContent = title;

}


if (aboutDescription) {

    const description =
        data.about_description ||
        "";

    const paragraphs =
        description
            .split(/\n\s*\n/)
            .map(function (text) {
                return text.trim();
            })
            .filter(Boolean);


    if (paragraphs.length) {

        aboutDescription.innerHTML = "";


        paragraphs.forEach(
            function (paragraphText) {

                const paragraph =
                    document.createElement("p");

                paragraph.textContent =
                    paragraphText;

                aboutDescription.appendChild(
                    paragraph
                );

            }
        );

    }

}


if (
    aboutImage &&
    data.about_image_url
) {

    aboutImage.src =
        data.about_image_url;

}



/* =================================================
   BRANCHES
================================================= */

function normalizeWhatsapp(
    value
) {

    let number =
        String(value || "")
            .replace(/\D/g, "");


    if (
        number.startsWith("0")
    ) {

        number =
            "961" +
            number.substring(1);

    }


    if (
        !number.startsWith("961") &&
        number.length > 0
    ) {

        number =
            "961" +
            number;

    }


    return number;
}


/* ---------------------------------------------
   BRANCH 1
--------------------------------------------- */

const branch1Name =
    document.getElementById(
        "branch1Name"
    );

const branch1Address =
    document.getElementById(
        "branch1Address"
    );

const branch1Whatsapp =
    document.getElementById(
        "branch1Whatsapp"
    );


if (branch1Name) {

    branch1Name.textContent =
        data.branch1_name ||
        "Ferzol Branch";

}


if (branch1Address) {

    branch1Address.textContent =
        data.branch1_address ||
        "Main Road";

}


if (branch1Whatsapp) {

    const number =
        normalizeWhatsapp(
            data.branch1_whatsapp
        );


    if (number) {

        branch1Whatsapp.href =
            `https://wa.me/${number}`;

        branch1Whatsapp.textContent =
            `WhatsApp · ${data.branch1_whatsapp}`;

    }

}


/* ---------------------------------------------
   BRANCH 2
--------------------------------------------- */

const branch2Name =
    document.getElementById(
        "branch2Name"
    );

const branch2Address =
    document.getElementById(
        "branch2Address"
    );

const branch2Whatsapp =
    document.getElementById(
        "branch2Whatsapp"
    );


if (branch2Name) {

    branch2Name.textContent =
        data.branch2_name ||
        "Baalbek Branch";

}


if (branch2Address) {

    branch2Address.textContent =
        data.branch2_address ||
        "Al-Souk";

}


if (branch2Whatsapp) {

    const number =
        normalizeWhatsapp(
            data.branch2_whatsapp
        );


    if (number) {

        branch2Whatsapp.href =
            `https://wa.me/${number}`;

        branch2Whatsapp.textContent =
            `WhatsApp · ${data.branch2_whatsapp}`;

    }

}


/* ---------------------------------------------
   BRANCH 3
--------------------------------------------- */

const branch3Name =
    document.getElementById(
        "branch3Name"
    );

const branch3Address =
    document.getElementById(
        "branch3Address"
    );

const branch3Whatsapp =
    document.getElementById(
        "branch3Whatsapp"
    );


if (branch3Name) {

    branch3Name.textContent =
        data.branch3_name ||
        "Majdaloun Branch";

}


if (branch3Address) {

    branch3Address.textContent =
        data.branch3_address ||
        "Majdaloun";

}


if (branch3Whatsapp) {

    const number =
        normalizeWhatsapp(
            data.branch3_whatsapp
        );


    if (number) {

        branch3Whatsapp.href =
            `https://wa.me/${number}`;

        branch3Whatsapp.textContent =
            `WhatsApp · ${data.branch3_whatsapp}`;

    }

}
            /* =================================================
               COMPANY NAME
            ================================================= */

            const company =
                data.company_name ||
                "CANDLE LIGHT";


            const menuName =
                document.getElementById(
                    "siteNameMenu"
                );

            
            const footerName =
                document.getElementById(
                    "siteNameFooter"
                );


            if (menuName) {

                menuName.textContent =
                    company;

            }




            if (footerName) {

                footerName.textContent =
                    company;

            }


            /* =================================================
               PAGE TITLE
            ================================================= */

            document.title =
                `${company} | Luxury Chandeliers`;


            /* =================================================
               LOGO
            ================================================= */

            if (data.logo_url) {

                const logoHeader =
                    document.getElementById(
                        "siteLogoHeader"
                    );

                const logoMenu =
                    document.getElementById(
                        "siteLogoMenu"
                    );

                const logoFooter =
                    document.getElementById(
                        "siteLogoFooter"
                    );


                if (logoHeader) {

                    logoHeader.src =
                        data.logo_url;

                }


                if (logoMenu) {

                    logoMenu.src =
                        data.logo_url;

                }


                if (logoFooter) {

                    logoFooter.src =
                        data.logo_url;

                }

            }


            /* =================================================
               COLORS
            ================================================= */

            if (data.background_color) {

                document.documentElement.style.setProperty(
                    "--bg",
                    data.background_color
                );

            }


            if (data.gold_color) {

                document.documentElement.style.setProperty(
                    "--gold",
                    data.gold_color
                );

            }


            if (data.text_color) {

                document.documentElement.style.setProperty(
                    "--text",
                    data.text_color
                );

            }


            /* =================================================
               BACKGROUND IMAGE
            ================================================= */

            if (data.background_image_url) {

                document.documentElement.style.setProperty(
                    "--website-background-image",
                    `url("${data.background_image_url}")`
                );

            }


            /* =================================================
               SOCIAL MEDIA
            ================================================= */

            const socialLinks =
                document.querySelectorAll(
                    "a[href]"
                );


            socialLinks.forEach(
                function (link) {

                    const text =
                        link.textContent
                            .trim()
                            .toLowerCase();


                    if (
                        text.includes("facebook") &&
                        data.facebook
                    ) {

                        link.href =
                            data.facebook;

                    }


                    if (
                        text.includes("instagram") &&
                        data.instagram
                    ) {

                        link.href =
                            data.instagram;

                    }


                    if (
                        text.includes("tiktok") &&
                        data.tiktok
                    ) {

                        link.href =
                            data.tiktok;

                    }

                }
            );


          
                

            /* =================================================
               CONTACT WHATSAPP
            ================================================= */

            const contactWhatsapp =
                document.getElementById(
                    "contactWhatsapp"
                );

            if (contactWhatsapp && data.whatsapp) {

                const number =
                    normalizeWhatsapp(
                        data.whatsapp
                    );

                if (number) {

                    contactWhatsapp.href =
                        `https://wa.me/${number}`;

                }

            }

        }

        catch (error) {

            console.error(
                "Website settings exception:",
                error
            );

        }

    }


loadWebsiteSettings();


   /* =====================================================
   PRODUCTS FROM SUPABASE
===================================================== */

async function loadWebsiteProducts() {

    const productsGrid =
        document.getElementById("productsGrid");

    if (!productsGrid) {
        return;
    }

    try {

        const { data, error } =
            await websiteSupabase
                .from("products")
                .select(
                    "id,name,category,description,image_url,visible,display_order,created_at"
                )
                .eq("visible", true)
                .order("display_order", {
                    ascending: true
                })
                .order("created_at", {
                    ascending: true
                });

        if (error) {

            console.error(
                "Products load error:",
                error
            );

            productsGrid.innerHTML = `
                <div class="products-loading">
                    Unable to load products.
                </div>
            `;

            return;
        }

        console.table(
            data.map(function(product) {
                return {
                    name: product.name,
                    display_order: product.display_order
                };
            })
        );

        if (!data || !data.length) {

            productsGrid.innerHTML = `
                <div class="products-loading">
                    No products available yet.
                </div>
            `;

            return;
        }

        productsGrid.innerHTML = "";

        data.forEach(function(product) {

            console.log(
                "RENDERING PRODUCT:",
                product.name,
                "ORDER:",
                product.display_order
            );

            const card =
                document.createElement("article");

            card.className =
                "website-product-card";

            /* IMAGE */

            const imageWrapper =
                document.createElement("div");

            imageWrapper.className =
                "website-product-image";

            if (product.image_url) {

                const image =
                    document.createElement("img");

                image.src =
                    product.image_url;

                image.alt =
                    product.name ||
                    "Candle Light Product";

                image.loading =
                    "lazy";

                imageWrapper.appendChild(
                    image
                );
            }

            /* CONTENT */

            const content =
                document.createElement("div");

            content.className =
                "website-product-content";

            if (product.category) {

                const category =
                    document.createElement("p");

                category.className =
                    "website-product-category";

                category.textContent =
                    product.category;

                content.appendChild(
                    category
                );
            }

            const name =
                document.createElement("h3");

            name.textContent =
                product.name ||
                "Candle Light Product";

            content.appendChild(
                name
            );

            if (product.description) {

                const description =
                    document.createElement("p");

                description.className =
                    "website-product-description";

                description.textContent =
                    product.description;

                content.appendChild(
                    description
                );
            }

            card.appendChild(
                imageWrapper
            );

            card.appendChild(
                content
            );

            productsGrid.appendChild(
                card
            );

        });

        /* =================================================
           CHECK FINAL DOM ORDER
        ================================================= */

        console.log(
            "FINAL DOM ORDER:",
            Array.from(
                productsGrid.querySelectorAll(
                    ".website-product-card"
                )
            ).map(function(card) {

                return card
                    .querySelector("h3")
                    ?.textContent
                    .trim();

            })
        );

    }

    catch (error) {

        console.error(
            "Products connection error:",
            error
        );

    }

}


loadWebsiteProducts(); 


   
    /* =====================================================
       MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const menuClose =
        document.getElementById("menuClose");

    const sideMenu =
        document.getElementById("sideMenu");

    const menuOverlay =
        document.getElementById("menuOverlay");


    function openMenu() {

        if (!sideMenu || !menuOverlay) return;

        sideMenu.classList.add("active");
        menuOverlay.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    function closeMenu() {

        if (!sideMenu || !menuOverlay) return;

        sideMenu.classList.remove("active");
        menuOverlay.classList.remove("active");

        const galleryModal =
            document.getElementById("galleryModal");

        const lightbox =
            document.getElementById("lightbox");

        const aiModal =
            document.getElementById("aiModal");


        if (
            (!galleryModal ||
                !galleryModal.classList.contains("active")) &&

            (!lightbox ||
                !lightbox.classList.contains("active")) &&

            (!aiModal ||
                !aiModal.classList.contains("active"))
        ) {

            document.body.style.overflow = "";
        }
    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            openMenu
        );

    }


    if (menuClose) {

        menuClose.addEventListener(
            "click",
            closeMenu
        );

    }


    if (menuOverlay) {

        menuOverlay.addEventListener(
            "click",
            closeMenu
        );

    }


    document
        .querySelectorAll(".menu-link")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                closeMenu
            );

        });



    /* =====================================================
       COLLECTION DATA
    ===================================================== */

    const collections = {

        traya: {

            title: "Signature Chandeliers",

            folder: "images/traya",

            prefix: "traya",

            count: 50

        },


        "trayet-daraj": {

            title: "Grand Staircase Lighting",

            folder: "images/trayet-daraj",

            prefix: "traya-daraj",

            count: 50

        },


        "trayet-n7as": {

            title: "Timeless Copper Collection",

            folder: "images/trayet-n7as",

            prefix: "traya-n7as",

            count: 50

        },


        decoration: {

            title: "Décor Collection",

            folder: "images/decoration",

            prefix: "decoration",

            count: 50

        }

    };



    /* =====================================================
       GALLERY
    ===================================================== */

    const galleryModal =
        document.getElementById("galleryModal");

    const galleryGrid =
        document.getElementById("galleryGrid");

    const galleryTitle =
        document.getElementById("galleryTitle");


    window.openGallery =
        function (collectionName) {


            const collection =
                collections[collectionName];


            if (!collection) {

                console.error(
                    "Collection not found:",
                    collectionName
                );

                return;

            }


            if (!galleryModal || !galleryGrid) {

                console.error(
                    "Gallery elements not found in HTML."
                );

                return;

            }


            if (galleryTitle) {

                galleryTitle.textContent =
                    collection.title;

            }


            galleryGrid.innerHTML = "";


            /* ---------------------------------------------
               LOAD LOCAL IMAGES
            --------------------------------------------- */

            for (
                let i = 1;
                i <= collection.count;
                i++
            ) {

                const imageName =
                    `${collection.prefix}${i}.jpg`;


                const item =
                    document.createElement("div");


                item.className =
                    "gallery-item";


                const image =
                    document.createElement("img");


                image.src =
                    `${collection.folder}/${imageName}`;


                image.alt =
                    `${collection.title} ${i}`;


                image.loading =
                    "lazy";


                image.onerror =
                    function () {

                        item.remove();

                    };


                image.onclick =
                    function () {

                        window.openLightbox(
                            image.src,
                            image.alt
                        );

                    };


                item.appendChild(
                    image
                );


                galleryGrid.appendChild(
                    item
                );

            }


            /* ---------------------------------------------
               OPEN GALLERY
            --------------------------------------------- */

            galleryModal.classList.add(
                "active"
            );


            document.body.style.overflow =
                "hidden";

        };



    /* =====================================================
       CLOSE GALLERY
    ===================================================== */

    window.closeGallery =
        function () {


            if (!galleryModal) return;


            galleryModal.classList.remove(
                "active"
            );


            const lightbox =
                document.getElementById("lightbox");

            const aiModal =
                document.getElementById("aiModal");


            if (
                (!lightbox ||
                    !lightbox.classList.contains("active")) &&

                (!aiModal ||
                    !aiModal.classList.contains("active"))
            ) {

                document.body.style.overflow = "";

            }

        };



    /* =====================================================
       LIGHTBOX
    ===================================================== */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");


    window.openLightbox =
        function (src, alt) {


            if (
                !lightbox ||
                !lightboxImage
            ) {

                return;

            }


            lightboxImage.src =
                src;


            lightboxImage.alt =
                alt;


            lightbox.classList.add(
                "active"
            );


            document.body.style.overflow =
                "hidden";

        };



    window.closeLightbox =
        function () {


            if (!lightbox) return;


            lightbox.classList.remove(
                "active"
            );


            if (lightboxImage) {

                lightboxImage.src = "";

            }


            if (
                galleryModal &&
                galleryModal.classList.contains(
                    "active"
                )
            ) {

                document.body.style.overflow =
                    "hidden";

            }

            else {

                const aiModal =
                    document.getElementById("aiModal");


                if (
                    !aiModal ||
                    !aiModal.classList.contains(
                        "active"
                    )
                ) {

                    document.body.style.overflow =
                        "";

                }

            }

        };



    /* =====================================================
       AI PREVIEW
    ===================================================== */

    const aiModal =
        document.getElementById("aiModal");

    const roomPreview =
        document.getElementById("roomPreview");


    window.startAI =
        function () {


            if (!aiModal) return;


            aiModal.classList.add(
                "active"
            );


            document.body.style.overflow =
                "hidden";

        };


    window.closeAI =
        function () {


            if (!aiModal) return;


            aiModal.classList.remove(
                "active"
            );


            if (
                (!galleryModal ||
                    !galleryModal.classList.contains(
                        "active"
                    )) &&

                (!lightbox ||
                    !lightbox.classList.contains(
                        "active"
                    )) &&

                (!sideMenu ||
                    !sideMenu.classList.contains(
                        "active"
                    ))
            ) {

                document.body.style.overflow =
                    "";

            }

        };



    /* =====================================================
       ROOM IMAGE PREVIEW
    ===================================================== */

    window.previewRoom =
        function (event) {


            const file =
                event.target.files[0];


            if (!file) return;


            if (
                !file.type.startsWith("image/")
            ) {

                alert(
                    "Please upload an image."
                );


                event.target.value = "";


                return;

            }


            if (!roomPreview) return;


            const reader =
                new FileReader();


            reader.onload =
                function (e) {


                    roomPreview.innerHTML = `

                        <div class="preview-label">
                            YOUR ROOM
                        </div>

                        <img
                            src="${e.target.result}"
                            alt="Living Room Preview"
                        >

                    `;

                };


            reader.readAsDataURL(file);

        };



    /* =====================================================
       AI MESSAGE
    ===================================================== */

    window.showAIMessage =
        function () {


            const upload =
                document.getElementById(
                    "roomUpload"
                );


            if (
                !upload ||
                !upload.files.length
            ) {

                alert(
                    "Please upload a living room photo first."
                );


                return;

            }


            alert(
                "Your room photo is ready for chandelier visualization. " +
                "The AI visualization system can be connected to an AI image service for the final result."
            );

        };



    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {


            if (event.key !== "Escape") {
                return;
            }


            if (
                lightbox &&
                lightbox.classList.contains("active")
            ) {

                window.closeLightbox();

                return;

            }


            if (
                galleryModal &&
                galleryModal.classList.contains("active")
            ) {

                window.closeGallery();

                return;

            }


            if (
                aiModal &&
                aiModal.classList.contains("active")
            ) {

                window.closeAI();

                return;

            }


            if (
                sideMenu &&
                sideMenu.classList.contains("active")
            ) {

                closeMenu();

            }

        }
    );



    /* =====================================================
       CLOSE AI BY BACKGROUND
    ===================================================== */

    if (aiModal) {

        aiModal.addEventListener(
            "click",
            function (event) {


                if (
                    event.target === aiModal
                ) {

                    window.closeAI();

                }

            }
        );

    }



    /* =====================================================
       CLOSE GALLERY BY BACKGROUND
    ===================================================== */

    if (galleryModal) {

        galleryModal.addEventListener(
            "click",
            function (event) {


                if (
                    event.target === galleryModal
                ) {

                    window.closeGallery();

                }

            }
        );

    }



    /* =====================================================
       LIGHTBOX BACKGROUND
    ===================================================== */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {


                if (
                    event.target === lightbox ||
                    event.target.classList.contains(
                        "lightbox-close"
                    )
                ) {

                    window.closeLightbox();

                }

            }
        );

    }



    /* =====================================================
       SUPABASE GALLERY
       ADD-ON ONLY
       DOES NOT REPLACE THE ORIGINAL GALLERY
    ===================================================== */

    if (
        window.supabase &&
        typeof window.supabase.createClient === "function"
    ) {

        console.log(
    "CANDLE LIGHT: Supabase connected."
);


        


        /*
         * This does NOT replace your existing gallery.
         * It only adds uploaded Supabase images
         * to the existing gallery.
         */

        const originalOpenGallery =
            window.openGallery;


        window.openGallery =
            async function (collectionName) {


                /*
                 * First open the original gallery.
                 * This keeps your Menu, Gallery,
                 * Lightbox and existing local images.
                 */

                if (
                    typeof originalOpenGallery ===
                    "function"
                ) {

                    originalOpenGallery(
                        collectionName
                    );

                }


                const galleryGrid =
                    document.getElementById(
                        "galleryGrid"
                    );


                if (!galleryGrid) {

                    console.error(
                        "Gallery grid not found."
                    );

                    return;

                }


                try {

                    const {
    data,
    error
} =
    await websiteSupabase
        .from("gallery_images")
                            .select(
                                "id, collection, image_url, storage_path, created_at"
                            )
                            .eq(
                                "collection",
                                collectionName
                            )
                            .order(
                                "created_at",
                                {
                                    ascending: false
                                }
                            );


                    if (error) {

                        console.error(
                            "Supabase gallery error:",
                            error
                        );

                        return;

                    }


                    if (!data || !data.length) {

                        console.log(
                            "No Supabase images for:",
                            collectionName
                        );

                        return;

                    }


                    /*
                     * Add Supabase images to the
                     * existing local gallery.
                     */

                    data.forEach(function (imageData) {

                        if (!imageData.image_url) {
                            return;
                        }


                        const item =
                            document.createElement("div");


                        item.className =
                            "gallery-item";


                        const image =
                            document.createElement("img");


                        image.src =
                            imageData.image_url;


                        image.alt =
                            "Candle Light " +
                            collectionName;


                        image.loading =
                            "lazy";


                        image.onclick =
                            function () {

                                if (
                                    typeof window.openLightbox ===
                                    "function"
                                ) {

                                    window.openLightbox(
                                        image.src,
                                        image.alt
                                    );

                                }

                            };


                        item.appendChild(
                            image
                        );


                        galleryGrid.prepend(
                            item
                        );

                    });


                    console.log(
                        "Supabase images loaded:",
                        data.length,
                        collectionName
                    );

                }

                catch (error) {

                    console.error(
                        "Supabase gallery connection error:",
                        error
                    );

                }

            };

    }

});