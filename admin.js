/* =========================================================
   CANDLE LIGHT
   ADMIN DASHBOARD JAVASCRIPT
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
    "https://tdvjmiksxarhrtbahomu.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_ExRGky7tnpPLJfoSmR4Z2A_c87JJlLX";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =========================================================
   COLLECTION NAMES
========================================================= */

const collectionNames = {

    "traya":
        "Signature Chandeliers",

    "trayet-daraj":
        "Grand Staircase Lighting",

    "trayet-n7as":
        "Timeless Copper Collection",

    "decoration":
        "Décor Collection"

};


/* =========================================================
   DOM - LOGIN
========================================================= */

const loginView =
    document.getElementById("loginView");

const dashboardView =
    document.getElementById("dashboardView");

const loginForm =
    document.getElementById("loginForm");

const adminEmail =
    document.getElementById("adminEmail");

const adminPassword =
    document.getElementById("adminPassword");

const loginBtn =
    document.getElementById("loginBtn");

const loginMessage =
    document.getElementById("loginMessage");

const logoutBtn =
    document.getElementById("logoutBtn");


/* =========================================================
   DOM - GALLERY
========================================================= */

const collectionSelect =
    document.getElementById("collectionSelect");

const imageInput =
    document.getElementById("imageInput");

const uploadBtn =
    document.getElementById("uploadBtn");

const uploadStatus =
    document.getElementById("uploadStatus");

const adminGallery =
    document.getElementById("adminGallery");

const imageCount =
    document.getElementById("imageCount");

const filterCollection =
    document.getElementById("filterCollection");


/* =========================================================
   DOM - WEBSITE SETTINGS
========================================================= */

const companyName =
    document.getElementById("companyName");

const websitePhone =
    document.getElementById("websitePhone");

const websiteWhatsapp =
    document.getElementById("websiteWhatsapp");

const websiteAddress =
    document.getElementById("websiteAddress");

const googleMaps =
    document.getElementById("googleMaps");

const instagramUrl =
    document.getElementById("instagramUrl");

const facebookUrl =
    document.getElementById("facebookUrl");

const tiktokUrl =
    document.getElementById("tiktokUrl");

const logoInput =
    document.getElementById("logoInput");

const logoPreview =
    document.getElementById("logoPreview");

const saveSettingsBtn =
    document.getElementById("saveSettingsBtn");

const settingsStatus =
    document.getElementById("settingsStatus");
/* =========================================================
   DOM - HERO
========================================================= */

const heroEyebrow =
    document.getElementById("heroEyebrow");

const heroTitle =
    document.getElementById("heroTitle");

const heroDescription =
    document.getElementById("heroDescription");

const heroButtonText =
    document.getElementById("heroButtonText");


/* =========================================================
   DOM - ABOUT
========================================================= */

const aboutEyebrow =
    document.getElementById("aboutEyebrow");

const aboutTitle =
    document.getElementById("aboutTitle");

const aboutDescription =
    document.getElementById("aboutDescription");

const aboutImageInput =
    document.getElementById("aboutImageInput");

const aboutImagePreview =
    document.getElementById("aboutImagePreview");


/* =========================================================
   DOM - BRANCHES
========================================================= */

const branch1Name =
    document.getElementById("branch1Name");

const branch1Address =
    document.getElementById("branch1Address");

const branch1Whatsapp =
    document.getElementById("branch1Whatsapp");


const branch2Name =
    document.getElementById("branch2Name");

const branch2Address =
    document.getElementById("branch2Address");

const branch2Whatsapp =
    document.getElementById("branch2Whatsapp");


const branch3Name =
    document.getElementById("branch3Name");

const branch3Address =
    document.getElementById("branch3Address");

const branch3Whatsapp =
    document.getElementById("branch3Whatsapp");

/* =========================================================
   DOM - DESIGN
========================================================= */

const backgroundColor =
    document.getElementById("backgroundColor");

const backgroundColorText =
    document.getElementById("backgroundColorText");

const goldColor =
    document.getElementById("goldColor");

const goldColorText =
    document.getElementById("goldColorText");

const textColor =
    document.getElementById("textColor");

const textColorText =
    document.getElementById("textColorText");

const websiteStyle =
    document.getElementById("websiteStyle");

const backgroundInput =
    document.getElementById("backgroundInput");

const backgroundPreview =
    document.getElementById("backgroundPreview");

const saveDesignBtn =
    document.getElementById("saveDesignBtn");

const designStatus =
    document.getElementById("designStatus");


/* =========================================================
   DOM - PRODUCTS
========================================================= */

const productFormTitle =
    document.getElementById("productFormTitle");

const productName =
    document.getElementById("productName");

const productCategory =
    document.getElementById("productCategory");

const productDescription =
    document.getElementById("productDescription");

const productImage =
    document.getElementById("productImage");

const productImagePreview =
    document.getElementById("productImagePreview");

const saveProductBtn =
    document.getElementById("saveProductBtn");

const cancelProductEditBtn =
    document.getElementById("cancelProductEditBtn");

const productStatus =
    document.getElementById("productStatus");

const productCount =
    document.getElementById("productCount");

    
const productsList =
    document.getElementById("productsList");


/* =========================================================
   CURRENT STATE
========================================================= */

let currentSettings = null;

let products = [];

let editingProductId = null;

let editingProductImageUrl = null;

let editingProductStoragePath = null;

let editingAboutImageUrl = null;
/* =========================================================
   SHOW LOGIN
========================================================= */

function showLogin() {

    if (loginView) {
        loginView.classList.remove("hidden");
    }

    if (dashboardView) {
        dashboardView.classList.add("hidden");
    }

}


/* =========================================================
   SHOW DASHBOARD
========================================================= */

async function showDashboard() {

    if (loginView) {
        loginView.classList.add("hidden");
    }

    if (dashboardView) {
        dashboardView.classList.remove("hidden");
    }


    await Promise.all([

        loadWebsiteSettings(),

        loadProducts(),

        loadGallery()

    ]);

}


/* =========================================================
   CHECK CURRENT SESSION
========================================================= */

async function checkSession() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.getSession();


        if (error) {

            console.error(
                "Session error:",
                error
            );

            showLogin();

            return;

        }


        if (data && data.session) {

            await showDashboard();

        }

        else {

            showLogin();

        }

    }

    catch (error) {

        console.error(
            "Session check error:",
            error
        );

        showLogin();

    }

}


/* =========================================================
   AUTH STATE CHANGE
========================================================= */

supabaseClient.auth.onAuthStateChange(
    async function (event, session) {

        if (
            event === "SIGNED_IN" &&
            session
        ) {

            await showDashboard();

        }

        if (
            event === "SIGNED_OUT"
        ) {

            showLogin();

        }

    }
);


/* =========================================================
   LOGIN
========================================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                adminEmail.value.trim();

            const password =
                adminPassword.value;


            if (!email || !password) {

                showMessage(
                    loginMessage,
                    "Please enter your email and password.",
                    "error"
                );

                return;

            }


            loginBtn.disabled =
                true;

            loginBtn.textContent =
                "LOGGING IN...";

            loginMessage.textContent =
                "";


            try {

                const {
                    data,
                    error
                } =
                    await supabaseClient.auth
                        .signInWithPassword({

                            email:
                                email,

                            password:
                                password

                        });


                if (error) {

                    console.error(
                        "Login error:",
                        error
                    );

                    showMessage(
                        loginMessage,
                        error.message ||
                        "Login failed. Please check your email and password.",
                        "error"
                    );

                    return;

                }


                if (data && data.session) {

                    adminPassword.value =
                        "";

                    await showDashboard();

                }

            }

            catch (error) {

                console.error(
                    "Login exception:",
                    error
                );

                showMessage(
                    loginMessage,
                    error.message ||
                    "Login failed. Please try again.",
                    "error"
                );

            }

            finally {

                loginBtn.disabled =
                    false;

                loginBtn.textContent =
                    "LOGIN";

            }

        }
    );

}


/* =========================================================
   LOGOUT
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async function () {

            try {

                await supabaseClient.auth.signOut();

            }

            catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

            }

            showLogin();

        }
    );

}


/* =========================================================
   WEBSITE SETTINGS
========================================================= */


/* =========================================================
   LOAD WEBSITE SETTINGS
========================================================= */

async function loadWebsiteSettings() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("website_settings")
                .select("*")
                .order(
                    "id",
                    {
                        ascending:
                            true
                    }
                )
                .limit(1)
                .maybeSingle();


        if (error) {

            console.error(
                "Settings load error:",
                error
            );

            showMessage(
                settingsStatus,
                "Unable to load website settings.",
                "error"
            );

            return;

        }


        currentSettings =
            data || null;


        if (!data) {

            setDefaultSettings();

            return;

        }


        fillSettingsForm(
            data
        );

    }

    catch (error) {

        console.error(
            "Settings error:",
            error
        );

        showMessage(
            settingsStatus,
            error.message ||
            "Unable to load website settings.",
            "error"
        );

    }

}


/* =========================================================
   DEFAULT SETTINGS
========================================================= */

function setDefaultSettings() {

    if (companyName) {

        companyName.value =
            "CANDLE LIGHT";

    }


    if (websitePhone) {

        websitePhone.value =
            "";

    }


    if (websiteWhatsapp) {

        websiteWhatsapp.value =
            "";

    }


    if (websiteAddress) {

        websiteAddress.value =
            "";

    }


    if (googleMaps) {

        googleMaps.value =
            "";

    }


    if (instagramUrl) {

        instagramUrl.value =
            "";

    }


    if (facebookUrl) {

        facebookUrl.value =
            "";

    }


    if (tiktokUrl) {

        tiktokUrl.value =
            "";

    }


    setColorValue(
        backgroundColor,
        backgroundColorText,
        "#F7F1E7"
    );
    /* ---------------------------------------------
       HERO
    --------------------------------------------- */

    if (heroEyebrow) {
        heroEyebrow.value =
            "LUXURY LIGHTING & CUSTOM DESIGN";
    }

    if (heroTitle) {
        heroTitle.value =
            "CANDLE LIGHT";
    }

    if (heroDescription) {
        heroDescription.value =
            "Elegant chandeliers, custom designs and lighting solutions created to transform your space with beauty and character.";
    }

    if (heroButtonText) {
        heroButtonText.value =
            "Explore Collection";
    }


    /* ---------------------------------------------
       ABOUT
    --------------------------------------------- */

    if (aboutEyebrow) {
        aboutEyebrow.value =
            "OUR STORY";
    }

    if (aboutTitle) {
        aboutTitle.value =
            "From One Beginning To Three Branches";
    }

    if (aboutDescription) {
        aboutDescription.value =
            "";
    }

    editingAboutImageUrl = null;


    /* ---------------------------------------------
       BRANCHES
    --------------------------------------------- */

    if (branch1Name) {
        branch1Name.value =
            "Ferzol Branch";
    }

    if (branch1Address) {
        branch1Address.value =
            "Main Road";
    }

    if (branch1Whatsapp) {
        branch1Whatsapp.value =
            "76 180990";
    }


    if (branch2Name) {
        branch2Name.value =
            "Baalbek Branch";
    }

    if (branch2Address) {
        branch2Address.value =
            "Al-Souk";
    }

    if (branch2Whatsapp) {
        branch2Whatsapp.value =
            "03 277716";
    }


    if (branch3Name) {
        branch3Name.value =
            "Majdaloun Junction Branch";
    }

    if (branch3Address) {
        branch3Address.value =
            "Majdaloun Junction";
    }

    if (branch3Whatsapp) {
        branch3Whatsapp.value =
            "70 632508";
    }

    setColorValue(
        goldColor,
        goldColorText,
        "#B99A62"
    );


    setColorValue(
        textColor,
        textColorText,
        "#40382F"
    );


    if (websiteStyle) {

        websiteStyle.value =
            "luxury";

    }

}


/* =========================================================
   FILL SETTINGS FORM
========================================================= */

function fillSettingsForm(
    settings
) {

    if (companyName) {

        companyName.value =
            settings.company_name || "";

    }


    if (websitePhone) {

        websitePhone.value =
            settings.phone || "";

    }


    if (websiteWhatsapp) {

        websiteWhatsapp.value =
            settings.whatsapp || "";

    }


    if (websiteAddress) {

        websiteAddress.value =
            settings.address || "";

    }


    if (googleMaps) {

        googleMaps.value =
            settings.google_maps || "";

    }


    if (instagramUrl) {

        instagramUrl.value =
            settings.instagram || "";

    }


    if (facebookUrl) {

        facebookUrl.value =
            settings.facebook || "";

    }


    if (tiktokUrl) {

        tiktokUrl.value =
            settings.tiktok || "";

    }
    /* ---------------------------------------------
       HERO
    --------------------------------------------- */

    if (heroEyebrow) {
        heroEyebrow.value =
            settings.hero_eyebrow ||
            "LUXURY LIGHTING & CUSTOM DESIGN";
    }

    if (heroTitle) {
        heroTitle.value =
            settings.hero_title ||
            settings.company_name ||
            "CANDLE LIGHT";
    }

    if (heroDescription) {
        heroDescription.value =
            settings.hero_description ||
            "Elegant chandeliers, custom designs and lighting solutions created to transform your space with beauty and character.";
    }

    if (heroButtonText) {
        heroButtonText.value =
            settings.hero_button_text ||
            "Explore Collection";
    }


    /* ---------------------------------------------
       ABOUT
    --------------------------------------------- */

    if (aboutEyebrow) {
        aboutEyebrow.value =
            settings.about_eyebrow ||
            "OUR STORY";
    }

    if (aboutTitle) {
        aboutTitle.value =
            settings.about_title ||
            "From One Beginning To Three Branches";
    }

    if (aboutDescription) {
        aboutDescription.value =
            settings.about_description ||
            "";
    }

    editingAboutImageUrl =
        settings.about_image_url ||
        null;


    if (
        settings.about_image_url &&
        aboutImagePreview
    ) {

        renderPreview(
            aboutImagePreview,
            settings.about_image_url,
            "about"
        );

    }


    /* ---------------------------------------------
       BRANCH 1
    --------------------------------------------- */

    if (branch1Name) {
        branch1Name.value =
            settings.branch1_name ||
            "";
    }

    if (branch1Address) {
        branch1Address.value =
            settings.branch1_address ||
            "";
    }

    if (branch1Whatsapp) {
        branch1Whatsapp.value =
            settings.branch1_whatsapp ||
            "";
    }


    /* ---------------------------------------------
       BRANCH 2
    --------------------------------------------- */

    if (branch2Name) {
        branch2Name.value =
            settings.branch2_name ||
            "";
    }

    if (branch2Address) {
        branch2Address.value =
            settings.branch2_address ||
            "";
    }

    if (branch2Whatsapp) {
        branch2Whatsapp.value =
            settings.branch2_whatsapp ||
            "";
    }


    /* ---------------------------------------------
       BRANCH 3
    --------------------------------------------- */

    if (branch3Name) {
        branch3Name.value =
            settings.branch3_name ||
            "";
    }

    if (branch3Address) {
        branch3Address.value =
            settings.branch3_address ||
            "";
    }

    if (branch3Whatsapp) {
        branch3Whatsapp.value =
            settings.branch3_whatsapp ||
            "";
    }

    setColorValue(
        backgroundColor,
        backgroundColorText,
        settings.background_color ||
        "#F7F1E7"
    );


    setColorValue(
        goldColor,
        goldColorText,
        settings.gold_color ||
        "#B99A62"
    );


    setColorValue(
        textColor,
        textColorText,
        settings.text_color ||
        "#40382F"
    );


    if (websiteStyle) {

        websiteStyle.value =
            settings.website_style ||
            "luxury";

    }


    if (
        settings.logo_url &&
        logoPreview
    ) {

        renderPreview(
            logoPreview,
            settings.logo_url,
            "logo"
        );

    }


    if (
        settings.background_image_url &&
        backgroundPreview
    ) {

        renderPreview(
            backgroundPreview,
            settings.background_image_url,
            "background"
        );

    }

}


/* =========================================================
   SAVE WEBSITE SETTINGS
========================================================= */

if (saveSettingsBtn) {

    saveSettingsBtn.addEventListener(
        "click",
        saveWebsiteSettings
    );

}


async function saveWebsiteSettings() {

    if (!saveSettingsBtn) {
        return;
    }


    saveSettingsBtn.disabled =
        true;

    saveSettingsBtn.textContent =
        "SAVING...";


    showMessage(
        settingsStatus,
        "Saving website settings...",
        ""
    );


    try {

        let logoUrl =
            currentSettings?.logo_url ||
            null;


        /* ---------------------------------------------
           UPLOAD NEW LOGO
        --------------------------------------------- */

        if (
            logoInput &&
            logoInput.files &&
            logoInput.files.length
        ) {

            const file =
                logoInput.files[0];


            const uploadedLogo =
                await uploadSiteAsset(
                    file,
                    "site-settings/logo"
                );


            logoUrl =
                uploadedLogo.publicUrl;

        }

        /* ---------------------------------------------
           UPLOAD ABOUT IMAGE
        --------------------------------------------- */

        if (
            aboutImageInput &&
            aboutImageInput.files &&
            aboutImageInput.files.length
        ) {

            const file =
                aboutImageInput.files[0];


            const uploadedAbout =
                await uploadSiteAsset(
                    file,
                    "site-settings/about"
                );


            editingAboutImageUrl =
                uploadedAbout.publicUrl;

        }
        /* ---------------------------------------------
           SETTINGS DATA
        --------------------------------------------- */

        const settingsData = {

            company_name:
                companyName?.value.trim() ||
                "CANDLE LIGHT",

            phone:
                websitePhone?.value.trim() ||
                "",

            whatsapp:
                websiteWhatsapp?.value.trim() ||
                "",

            address:
                websiteAddress?.value.trim() ||
                "",

            google_maps:
                googleMaps?.value.trim() ||
                "",

            instagram:
                instagramUrl?.value.trim() ||
                "",

            facebook:
                facebookUrl?.value.trim() ||
                "",

            tiktok:
                tiktokUrl?.value.trim() ||
                "",

            logo_url:
                logoUrl,
            /* ---------------------------------------------
               HERO
            --------------------------------------------- */

            hero_eyebrow:
                heroEyebrow?.value.trim() ||
                "LUXURY LIGHTING & CUSTOM DESIGN",

            hero_title:
                heroTitle?.value.trim() ||
                companyName?.value.trim() ||
                "CANDLE LIGHT",

            hero_description:
                heroDescription?.value.trim() ||
                "",

            hero_button_text:
                heroButtonText?.value.trim() ||
                "Explore Collection",


            /* ---------------------------------------------
               ABOUT
            --------------------------------------------- */

            about_eyebrow:
                aboutEyebrow?.value.trim() ||
                "OUR STORY",

            about_title:
                aboutTitle?.value.trim() ||
                "From One Beginning To Three Branches",

            about_description:
                aboutDescription?.value.trim() ||
                "",

            about_image_url:
                editingAboutImageUrl,


            /* ---------------------------------------------
               BRANCH 1
            --------------------------------------------- */

            branch1_name:
                branch1Name?.value.trim() ||
                "",

            branch1_address:
                branch1Address?.value.trim() ||
                "",

            branch1_whatsapp:
                branch1Whatsapp?.value.trim() ||
                "",


            /* ---------------------------------------------
               BRANCH 2
            --------------------------------------------- */

            branch2_name:
                branch2Name?.value.trim() ||
                "",

            branch2_address:
                branch2Address?.value.trim() ||
                "",

            branch2_whatsapp:
                branch2Whatsapp?.value.trim() ||
                "",


            /* ---------------------------------------------
               BRANCH 3
            --------------------------------------------- */

            branch3_name:
                branch3Name?.value.trim() ||
                "",

            branch3_address:
                branch3Address?.value.trim() ||
                "",

            branch3_whatsapp:
                branch3Whatsapp?.value.trim() ||
                "",
            updated_at:
                new Date().toISOString()

        };


        let result;


        /* ---------------------------------------------
           UPDATE EXISTING ROW
        --------------------------------------------- */

        if (currentSettings?.id) {

            result =
                await supabaseClient
                    .from("website_settings")
                    .update(
                        settingsData
                    )
                    .eq(
                        "id",
                        currentSettings.id
                    )
                    .select()
                    .single();

        }


        /* ---------------------------------------------
           CREATE FIRST ROW
        --------------------------------------------- */

        else {

            result =
                await supabaseClient
                    .from("website_settings")
                    .insert([
                        settingsData
                    ])
                    .select()
                    .single();

        }


        if (result.error) {

            throw result.error;

        }


        currentSettings =
            result.data;


        if (logoInput) {

            logoInput.value =
                "";

        }

                if (aboutImageInput) {

            aboutImageInput.value =
                "";

        }


        if (
            logoUrl &&
            logoPreview
        ) {

            renderPreview(
                logoPreview,
                logoUrl,
                "logo"
            );

        }
        if (
            editingAboutImageUrl &&
            aboutImagePreview
        ) {

            renderPreview(
                aboutImagePreview,
                editingAboutImageUrl,
                "about"
            );

        }

        showMessage(
            settingsStatus,
            "Website settings saved successfully.",
            "success"
        );

    }

    catch (error) {

        console.error(
            "Save settings error:",
            error
        );

        showMessage(
            settingsStatus,
            error.message ||
            "Unable to save website settings.",
            "error"
        );

    }

    finally {

        saveSettingsBtn.disabled =
            false;

        saveSettingsBtn.textContent =
            "SAVE WEBSITE SETTINGS";

    }

}


/* =========================================================
   WEBSITE DESIGN
========================================================= */

if (saveDesignBtn) {

    saveDesignBtn.addEventListener(
        "click",
        saveWebsiteDesign
    );

}


async function saveWebsiteDesign() {

    if (!saveDesignBtn) {
        return;
    }


    saveDesignBtn.disabled =
        true;

    saveDesignBtn.textContent =
        "SAVING...";


    showMessage(
        designStatus,
        "Saving website design...",
        ""
    );


    try {

        let backgroundImageUrl =
            currentSettings?.background_image_url ||
            null;


        /* ---------------------------------------------
           UPLOAD BACKGROUND IMAGE
        --------------------------------------------- */

        if (
            backgroundInput &&
            backgroundInput.files &&
            backgroundInput.files.length
        ) {

            const file =
                backgroundInput.files[0];


            const uploadedBackground =
                await uploadSiteAsset(
                    file,
                    "site-settings/background"
                );


            backgroundImageUrl =
                uploadedBackground.publicUrl;

        }


        const designData = {

            background_color:
                normalizeColor(
                    backgroundColorText?.value,
                    "#F7F1E7"
                ),

            gold_color:
                normalizeColor(
                    goldColorText?.value,
                    "#B99A62"
                ),

            text_color:
                normalizeColor(
                    textColorText?.value,
                    "#40382F"
                ),

            website_style:
                websiteStyle?.value ||
                "luxury",

            background_image_url:
                backgroundImageUrl,

            updated_at:
                new Date().toISOString()

        };


        let result;


        if (currentSettings?.id) {

            result =
                await supabaseClient
                    .from("website_settings")
                    .update(
                        designData
                    )
                    .eq(
                        "id",
                        currentSettings.id
                    )
                    .select()
                    .single();

        }

        else {

            result =
                await supabaseClient
                    .from("website_settings")
                    .insert([
                        designData
                    ])
                    .select()
                    .single();

        }


        if (result.error) {

            throw result.error;

        }


        currentSettings =
            result.data;


        if (backgroundInput) {

            backgroundInput.value =
                "";

        }


        if (
            backgroundImageUrl &&
            backgroundPreview
        ) {

            renderPreview(
                backgroundPreview,
                backgroundImageUrl,
                "background"
            );

        }


        showMessage(
            designStatus,
            "Website design saved successfully.",
            "success"
        );

    }

    catch (error) {

        console.error(
            "Save design error:",
            error
        );

        showMessage(
            designStatus,
            error.message ||
            "Unable to save website design.",
            "error"
        );

    }

    finally {

        saveDesignBtn.disabled =
            false;

        saveDesignBtn.textContent =
            "SAVE DESIGN";

    }

}


/* =========================================================
   COLOR INPUT SYNCHRONIZATION
========================================================= */

if (backgroundColor) {

    backgroundColor.addEventListener(
        "input",
        function () {

            if (backgroundColorText) {

                backgroundColorText.value =
                    backgroundColor.value.toUpperCase();

            }

        }
    );

}


if (goldColor) {

    goldColor.addEventListener(
        "input",
        function () {

            if (goldColorText) {

                goldColorText.value =
                    goldColor.value.toUpperCase();

            }

        }
    );

}


if (textColor) {

    textColor.addEventListener(
        "input",
        function () {

            if (textColorText) {

                textColorText.value =
                    textColor.value.toUpperCase();

            }

        }
    );

}


/* =========================================================
   TEXT -> COLOR PICKER
========================================================= */

if (backgroundColorText) {

    backgroundColorText.addEventListener(
        "change",
        function () {

            const color =
                normalizeColor(
                    backgroundColorText.value,
                    "#F7F1E7"
                );


            backgroundColorText.value =
                color;


            if (backgroundColor) {

                backgroundColor.value =
                    color;

            }

        }
    );

}


if (goldColorText) {

    goldColorText.addEventListener(
        "change",
        function () {

            const color =
                normalizeColor(
                    goldColorText.value,
                    "#B99A62"
                );


            goldColorText.value =
                color;


            if (goldColor) {

                goldColor.value =
                    color;

            }

        }
    );

}


if (textColorText) {

    textColorText.addEventListener(
        "change",
        function () {

            const color =
                normalizeColor(
                    textColorText.value,
                    "#40382F"
                );


            textColorText.value =
                color;


            if (textColor) {

                textColor.value =
                    color;

            }

        }
    );

}




/* =========================================================
   SET COLOR VALUE
========================================================= */

function setColorValue(
    colorInput,
    textInput,
    value
) {

    const color =
        normalizeColor(
            value,
            "#F7F1E7"
        );


    if (colorInput) {

        colorInput.value =
            color;

    }


    if (textInput) {

        textInput.value =
            color;

    }

}





/* =========================================================
   NORMALIZE COLOR
========================================================= */






function normalizeColor(
    value,
    fallback
) {

    const clean =
        String(value || "")
            .trim();


    if (
        /^#[0-9A-Fa-f]{6}$/.test(clean)
    ) {

        return clean.toUpperCase();

    }


    return fallback;

}


/* =========================================================
   UPLOAD SITE ASSET
========================================================= */

async function uploadSiteAsset(
    file,
    folder
) {

    if (!file) {

        throw new Error(
            "Please choose a file."
        );

    }


    if (
        !file.type ||
        !file.type.startsWith("image/")
    ) {

        throw new Error(
            "Please choose a valid image file."
        );

    }


    const safeName =
        file.name
            .replace(
                /[^\w.-]+/g,
                "-"
            );


    const uniqueId =
        typeof crypto !== "undefined" &&
        crypto.randomUUID
            ? crypto.randomUUID()
            : Date.now();


    const storagePath =
        `${folder}/${Date.now()}-${uniqueId}-${safeName}`;


    const {
        error
    } =
        await supabaseClient
            .storage
            .from("gallery")
            .upload(
                storagePath,
                file,
                {
                    upsert:
                        false,

                    contentType:
                        file.type
                }
            );


    if (error) {

        throw error;

    }


    const {
        data
    } =
        supabaseClient
            .storage
            .from("gallery")
            .getPublicUrl(
                storagePath
            );


    return {

        storagePath:
            storagePath,

        publicUrl:
            data.publicUrl

    };

}


/* =========================================================
   PREVIEW
========================================================= */

function renderPreview(
    container,
    url,
    type
) {

    if (!container || !url) {
        return;
    }


    container.innerHTML =
        "";


    const img =
        document.createElement(
            "img"
        );


    img.src =
        url;
img.alt =
    type === "logo"
        ? "Website Logo"
        : type === "background"
            ? "Website Background"
            : type === "about"
                ? "About Image"
                : "Product Image";


    img.onerror =
        function () {

            container.innerHTML =
                `
                <div class="empty-state">
                    Image unavailable
                </div>
                `;

        };


    if (type === "background") {

        img.style.width =
            "240px";

        img.style.height =
            "130px";

        img.style.objectFit =
            "cover";

        img.style.padding =
            "0";

    }


    if (type === "product") {

        img.style.maxWidth =
            "240px";

        img.style.maxHeight =
            "180px";

        img.style.objectFit =
            "cover";

    }


    container.appendChild(
        img
    );

}


/* =========================================================
   LOGO PREVIEW BEFORE SAVE
========================================================= */

if (logoInput) {

    logoInput.addEventListener(
        "change",
        function () {

            const file =
                logoInput.files?.[0];


            if (!file) {
                return;
            }


            const url =
                URL.createObjectURL(
                    file
                );


            renderPreview(
                logoPreview,
                url,
                "logo"
            );

        }
    );

}


/* =========================================================
   BACKGROUND PREVIEW BEFORE SAVE
========================================================= */

if (backgroundInput) {

    backgroundInput.addEventListener(
        "change",
        function () {

            const file =
                backgroundInput.files?.[0];


            if (!file) {
                return;
            }


            const url =
                URL.createObjectURL(
                    file
                );


            renderPreview(
                backgroundPreview,
                url,
                "background"
            );

        }
    );

}

/* =========================================================
   ABOUT IMAGE PREVIEW BEFORE SAVE
========================================================= */

if (aboutImageInput) {

    aboutImageInput.addEventListener(
        "change",
        function () {

            const file =
                aboutImageInput.files?.[0];


            if (!file) {
                return;
            }


            const url =
                URL.createObjectURL(
                    file
                );


            renderPreview(
                aboutImagePreview,
                url,
                "about"
            );

        }
    );

}
/* =========================================================
   PRODUCTS
========================================================= */

async function loadProducts() {

    if (!productsList) {
        return;
    }


    productsList.innerHTML = `

        <div class="empty-state">

            Loading products...

        </div>

    `;


    try {
 const { data, error } =
    await supabaseClient
        .from("products")
        .select("*")
        .order("display_order", {
            ascending: true
        })
        .order("created_at", {
            ascending: true
        });


        if (error) {

            throw error;

        }


        products =
            data || [];


        renderProducts();

    }

    catch (error) {

        console.error(
            "Products load error:",
            error
        );


        productsList.innerHTML = `

            <div class="empty-state">

                <strong>
                    Unable to load products.
                </strong>

                <br><br>

                ${escapeHtml(error.message)}

            </div>

        `;

    }

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    if (!productsList) {
        return;
    }


    if (productCount) {

        productCount.textContent =
            `${products.length} ${
                products.length === 1
                    ? "product"
                    : "products"
            }`;

    }


    productsList.innerHTML =
        "";


    if (!products.length) {

        productsList.innerHTML = `

            <div class="empty-state">

                No products added yet.

            </div>

        `;

        return;

    }


    products.forEach(
        function (product) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "product-card";


            /* -----------------------------------------
               IMAGE
            ----------------------------------------- */

            const imageWrapper =
                document.createElement(
                    "div"
                );


            imageWrapper.className =
                "product-image";


            if (product.image_url) {

                const img =
                    document.createElement(
                        "img"
                    );


                img.src =
                    product.image_url;


                img.alt =
                    product.name ||
                    "Candle Light Product";


                img.loading =
                    "lazy";


                img.onerror =
                    function () {

                        imageWrapper.innerHTML = `

                            <div class="empty-state">

                                Image unavailable

                            </div>

                        `;

                    };


                imageWrapper.appendChild(
                    img
                );

            }

            else {

                imageWrapper.innerHTML = `

                    <div class="empty-state">

                        No image

                    </div>

                `;

            }


            /* -----------------------------------------
               CONTENT
            ----------------------------------------- */

            const content =
                document.createElement(
                    "div"
                );


            content.className =
                "product-content";


            const category =
                document.createElement(
                    "div"
                );


            category.className =
                "product-category";


            category.textContent =
                product.category ||
                "Product";


            const name =
                document.createElement(
                    "div"
                );


            name.className =
                "product-name";


            name.textContent =
                product.name ||
                "Unnamed Product";


            const description =
                document.createElement(
                    "div"
                );


            description.className =
                "product-description";


            description.textContent =
                product.description ||
                "No description added.";




                 /* -----------------------------------------
   ORDER
----------------------------------------- */

const orderBox = document.createElement("div");
orderBox.className = "product-order";

const orderLabel = document.createElement("label");
orderLabel.textContent = "DISPLAY ORDER";

const orderControls = document.createElement("div");
orderControls.className = "product-order-controls";

const moveUpBtn = document.createElement("button");
moveUpBtn.type = "button";
moveUpBtn.className = "product-order-move";
moveUpBtn.textContent = "↑ MOVE UP";

const orderInput = document.createElement("input");
orderInput.type = "number";
orderInput.min = "1";
orderInput.value = product.display_order ?? 1;
orderInput.className = "product-order-input";

const moveDownBtn = document.createElement("button");
moveDownBtn.type = "button";
moveDownBtn.className = "product-order-move";
moveDownBtn.textContent = "↓ MOVE DOWN";

const saveOrderBtn = document.createElement("button");
saveOrderBtn.type = "button";
saveOrderBtn.className = "product-order-save";
saveOrderBtn.textContent = "SAVE ORDER";

moveUpBtn.addEventListener("click", function () {
    moveProduct(product, "up");
});

moveDownBtn.addEventListener("click", function () {
    moveProduct(product, "down");
});

saveOrderBtn.addEventListener("click", function () {
    updateProductOrder(product, orderInput, saveOrderBtn);
});

orderControls.appendChild(moveUpBtn);
orderControls.appendChild(orderInput);
orderControls.appendChild(moveDownBtn);

orderBox.appendChild(orderLabel);
orderBox.appendChild(orderControls);
orderBox.appendChild(saveOrderBtn);


            /* -----------------------------------------
               STATUS
            ----------------------------------------- */

            const status =
                document.createElement(
                    "div"
                );


            status.className =
                product.visible
                    ? "product-status visible"
                    : "product-status hidden-product";


            status.textContent =
                product.visible
                    ? "VISIBLE"
                    : "HIDDEN";


            /* -----------------------------------------
               ACTIONS
            ----------------------------------------- */

            const actions =
                document.createElement(
                    "div"
                );


            actions.className =
                "product-actions";


            const editBtn =
                document.createElement(
                    "button"
                );


            editBtn.type =
                "button";


            editBtn.className =
                "product-action-button";


            editBtn.textContent =
                "EDIT";


            editBtn.addEventListener(
                "click",
                function () {

                    editProduct(
                        product
                    );

                }
            );


            const toggleBtn =
                document.createElement(
                    "button"
                );


            toggleBtn.type =
                "button";


            toggleBtn.className =
                "product-action-button";


            toggleBtn.textContent =
                product.visible
                    ? "HIDE"
                    : "SHOW";


            toggleBtn.addEventListener(
                "click",
                function () {

                    toggleProductVisibility(
                        product,
                        toggleBtn
                    );

                }
            );


            const deleteBtn =
                document.createElement(
                    "button"
                );


            deleteBtn.type =
                "button";


            deleteBtn.className =
                "product-action-button delete";


            deleteBtn.textContent =
                "DELETE";


            deleteBtn.onclick = function () {

    console.log("DELETE BUTTON CLICKED");
    console.log("PRODUCT ID:", product.id);

    deleteProduct(
        product.id,
        deleteBtn
    );

};


            actions.appendChild(
                editBtn
            );

            actions.appendChild(
                toggleBtn
            );

            actions.appendChild(
                deleteBtn
            );


            content.appendChild(
                category
            );

            content.appendChild(
                name
            );

            content.appendChild(
                description
            );


            content.appendChild(
    orderBox
);
            content.appendChild(
                status
            );

            content.appendChild(
                actions
            );


            card.appendChild(
                imageWrapper
            );

            card.appendChild(
                content
            );


            productsList.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   SAVE PRODUCT
========================================================= */

if (saveProductBtn) {

    saveProductBtn.addEventListener(
        "click",
        saveProduct
    );

}


async function saveProduct() {

    if (!productName) {
        return;
    }


    const name =
        productName.value.trim();

    const category =
        productCategory?.value.trim() ||
        "";

    const description =
        productDescription?.value.trim() ||
        "";


    if (!name) {

        showMessage(
            productStatus,
            "Please enter a product name.",
            "error"
        );

        return;

    }


    saveProductBtn.disabled =
        true;


    saveProductBtn.textContent =
        editingProductId
            ? "UPDATING..."
            : "ADDING...";


    showMessage(
        productStatus,
        editingProductId
            ? "Updating product..."
            : "Adding product...",
        ""
    );


    try {

        let imageUrl =
            editingProductImageUrl ||
            null;


        let storagePath =
            editingProductStoragePath ||
            null;


        /* ---------------------------------------------
           NEW PRODUCT IMAGE
        --------------------------------------------- */

        if (
            productImage &&
            productImage.files &&
            productImage.files.length
        ) {

            const file =
                productImage.files[0];


            const uploaded =
                await uploadSiteAsset(
                    file,
                    "products"
                );


            imageUrl =
                uploaded.publicUrl;


            storagePath =
                uploaded.storagePath;

        }


        /* ---------------------------------------------
           EDIT EXISTING PRODUCT
        --------------------------------------------- */

        if (editingProductId) {

            const {
                data,
                error
            } =
                await supabaseClient
                    .from("products")
                    .update({

                        name:
                            name,

                        category:
                            category,

                        description:
                            description,

                        image_url:
                            imageUrl,

                        storage_path:
                            storagePath,

                        updated_at:
                            new Date().toISOString()

                    })
                    .eq(
                        "id",
                        editingProductId
                    )
                    .select()
                    .single();


            if (error) {

                throw error;

            }


            if (
                productImage &&
                productImage.files &&
                productImage.files.length &&
                editingProductStoragePath &&
                editingProductStoragePath !==
                    storagePath
            ) {

                await removeStorageFile(
                    editingProductStoragePath
                );

            }


            showMessage(
                productStatus,
                "Product updated successfully.",
                "success"
            );

        }

        else {

            const { data: lastProduct } =
    await supabaseClient
        .from("products")
        .select("display_order")
        .order("display_order", {
            ascending: false
        })
        .limit(1)
        .maybeSingle();

const nextOrder =
    (lastProduct?.display_order ?? 0) + 1;

            const {
    error
} =
    await supabaseClient
        .from("products")
        .insert({

            name:
                name,

            category:
                category,

            description:
                description,

            image_url:
                imageUrl,

            storage_path:
                storagePath,

            visible:
                true,

            display_order:
                nextOrder

        });


            if (error) {

                if (storagePath) {

                    await removeStorageFile(
                        storagePath
                    );

                }


                throw error;

            }


            showMessage(
                productStatus,
                "Product added successfully.",
                "success"
            );

        }


        resetProductForm();

        await loadProducts();

    }

    catch (error) {

        console.error(
            "Save product error:",
            error
        );


        showMessage(
            productStatus,
            error.message ||
            "Unable to save product.",
            "error"
        );

    }

    finally {

        saveProductBtn.disabled =
            false;

        saveProductBtn.textContent =
            editingProductId
                ? "UPDATE PRODUCT"
                : "ADD PRODUCT";

    }

}




/* =========================================================
   UPDATE PRODUCT ORDER
========================================================= */

async function updateProductOrder(
    product,
    input,
    button
) {

    const newOrder =
        parseInt(
            input.value,
            10
        );

    if (
        !Number.isInteger(newOrder) ||
        newOrder < 1
    ) {

        alert(
            "Please enter a valid order number."
        );

        return;
    }

    button.disabled = true;
    button.textContent = "SAVING...";

    try {

        const {
            error
        } =
            await supabaseClient
                .from("products")
                .update({

                    display_order:
                        newOrder,

                    updated_at:
                        new Date().toISOString()

                })
                .eq(
                    "id",
                    product.id
                );

        if (error) {
            throw error;
        }

        showMessage(
            productStatus,
            "Product order updated successfully.",
            "success"
        );

        await loadProducts();

    }

    catch (error) {

        console.error(
            "Update product order error:",
            error
        );

        alert(
            "Unable to update product order."
        );

        button.disabled = false;
        button.textContent = "SAVE ORDER";
    }
}


/* =========================================================
   MOVE PRODUCT
========================================================= */

async function moveProduct(
    product,
    direction
) {

    console.log(
        "MOVE CLICKED:",
        product.name,
        direction
    );

    const currentIndex =
        products.findIndex(
            function (p) {
                return p.id === product.id;
            }
        );

    console.log(
        "CURRENT INDEX:",
        currentIndex
    );

    console.log(
        "PRODUCTS:",
        products
    );

    if (currentIndex === -1) {

        alert(
            "Product not found."
        );

        return;
    }


    /* ---------------------------------------------
       FIND TARGET
    --------------------------------------------- */

    let targetIndex;

    if (direction === "up") {

        targetIndex =
            currentIndex - 1;

    }

    else {

        targetIndex =
            currentIndex + 1;

    }


    /* ---------------------------------------------
       CHECK LIMITS
    --------------------------------------------- */

    if (
        targetIndex < 0 ||
        targetIndex >= products.length
    ) {

        if (direction === "up") {

            alert(
                "This product is already at the top."
            );

        }

        else {

            alert(
                "This product is already at the bottom."
            );

        }

        return;
    }


    const targetProduct =
        products[targetIndex];


    console.log(
        "TARGET PRODUCT:",
        targetProduct.name
    );


    /* ---------------------------------------------
       CURRENT ORDERS
    --------------------------------------------- */

    const currentOrder =
        Number(
            product.display_order
        );

    const targetOrder =
        Number(
            targetProduct.display_order
        );


    console.log(
        "CURRENT ORDER:",
        currentOrder
    );

    console.log(
        "TARGET ORDER:",
        targetOrder
    );


    try {

        /* -----------------------------------------
           STEP 1
           TEMPORARY ORDER
        ----------------------------------------- */

        let {
            error
        } =
            await supabaseClient
                .from("products")
                .update({

                    display_order:
                        999999

                })
                .eq(
                    "id",
                    product.id
                );


        if (error) {
            throw error;
        }


        /* -----------------------------------------
           STEP 2
           TARGET GETS CURRENT ORDER
        ----------------------------------------- */

        ({
            error
        } =
            await supabaseClient
                .from("products")
                .update({

                    display_order:
                        currentOrder,

                    updated_at:
                        new Date().toISOString()

                })
                .eq(
                    "id",
                    targetProduct.id
                ));


        if (error) {
            throw error;
        }


        /* -----------------------------------------
           STEP 3
           CURRENT GETS TARGET ORDER
        ----------------------------------------- */

        ({
            error
        } =
            await supabaseClient
                .from("products")
                .update({

                    display_order:
                        targetOrder,

                    updated_at:
                        new Date().toISOString()

                })
                .eq(
                    "id",
                    product.id
                ));


        if (error) {
            throw error;
        }


        /* -----------------------------------------
           RELOAD
        ----------------------------------------- */

        await loadProducts();


        showMessage(
            productStatus,
            "Product order updated successfully.",
            "success"
        );


        console.log(
            "PRODUCT ORDER UPDATED SUCCESSFULLY"
        );

    }


    catch (error) {

        console.error(
            "MOVE PRODUCT ERROR:",
            error
        );

        alert(
            "Unable to change product order."
        );

        await loadProducts();

    }

}


/* =========================================================
   EDIT PRODUCT
========================================================= */

function editProduct(
    product
) {

    editingProductId =
        product.id;

    editingProductImageUrl =
        product.image_url ||
        null;

    editingProductStoragePath =
        product.storage_path ||
        null;


    if (productName) {

        productName.value =
            product.name ||
            "";

    }


    if (productCategory) {

        productCategory.value =
            product.category ||
            "";

    }


    if (productDescription) {

        productDescription.value =
            product.description ||
            "";

    }


    if (productImage) {

        productImage.value =
            "";

    }


    if (
        product.image_url &&
        productImagePreview
    ) {

        renderPreview(
            productImagePreview,
            product.image_url,
            "product"
        );

    }

    else if (
        productImagePreview
    ) {

        productImagePreview.innerHTML =
            "";

    }


    if (productFormTitle) {

        productFormTitle.textContent =
            "Edit Product";

    }


    if (saveProductBtn) {

        saveProductBtn.textContent =
            "UPDATE PRODUCT";

    }


    if (cancelProductEditBtn) {

        cancelProductEditBtn.classList.remove(
            "hidden"
        );

    }


    showMessage(
        productStatus,
        "Editing product. Make your changes and save.",
        ""
    );


    document
        .querySelector(
            ".product-form-card"
        )
        ?.scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"

        });

}

/* =========================================================
   RESET PRODUCT FORM
========================================================= */

function resetProductForm() {

    editingProductId =
        null;

    editingProductImageUrl =
        null;

    editingProductStoragePath =
        null;


    if (productName) {

        productName.value =
            "";

    }


    if (productCategory) {

        productCategory.value =
            "";

    }


    if (productDescription) {

        productDescription.value =
            "";

    }


    if (productImage) {

        productImage.value =
            "";

    }


    if (productImagePreview) {

        productImagePreview.innerHTML =
            "";

    }


    if (productFormTitle) {

        productFormTitle.textContent =
            "Add New Product";

    }


    if (saveProductBtn) {

        saveProductBtn.textContent =
            "ADD PRODUCT";

    }


    if (cancelProductEditBtn) {

        cancelProductEditBtn.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   PRODUCT IMAGE PREVIEW
========================================================= */

if (productImage) {

    productImage.addEventListener(
        "change",
        function () {

            const file =
                productImage.files?.[0];


            if (!file) {
                return;
            }


            const url =
                URL.createObjectURL(
                    file
                );


            renderPreview(
                productImagePreview,
                url,
                "product"
            );

        }
    );

}


/* =========================================================
   TOGGLE PRODUCT VISIBILITY
========================================================= */

async function toggleProductVisibility(
    product,
    button
) {

    button.disabled =
        true;

    button.textContent =
        "SAVING...";


    try {

        const newVisibility =
            !product.visible;


        const {
            error
        } =
            await supabaseClient
                .from("products")
                .update({

                    visible:
                        newVisibility,

                    updated_at:
                        new Date().toISOString()

                })
                .eq(
                    "id",
                    product.id
                );


        if (error) {

            throw error;

        }


        await loadProducts();

    }

    catch (error) {

        console.error(
            "Toggle product error:",
            error
        );


        alert(
            "Unable to change product visibility."
        );


        button.disabled =
            false;

        button.textContent =
            product.visible
                ? "HIDE"
                : "SHOW";

    }

}

/* =========================================================
   DELETE PRODUCT
========================================================= */

async function deleteProduct(id, button) {

    console.log("DELETE PRODUCT CLICKED");
    console.log("PRODUCT ID:", id);

    if (!id) {
        alert("Product ID is missing.");
        return;
    }

    const confirmed = confirm(
        "Are you sure you want to permanently delete this product?"
    );

    if (!confirmed) {
        return;
    }

    if (button) {
        button.disabled = true;
        button.textContent = "DELETING...";
    }

    try {

        /* -----------------------------------------
           DELETE PRODUCT AND RETURN DELETED ROW
        ----------------------------------------- */

        const { data, error } =
            await supabaseClient
                .from("products")
                .delete()
                .eq("id", id)
                .select();

        console.log("DELETE DATA:", data);
        console.log("DELETE ERROR:", error);

        if (error) {
            throw error;
        }

        /* -----------------------------------------
           CHECK IF A ROW WAS DELETED
        ----------------------------------------- */

        if (!data || data.length === 0) {

            alert(
                "The product was not deleted.\n\n" +
                "Supabase did not return a deleted product."
            );

            if (button) {
                button.disabled = false;
                button.textContent = "DELETE";
            }

            return;
        }

        /* -----------------------------------------
           SUCCESS
        ----------------------------------------- */

        console.log(
            "PRODUCT SUCCESSFULLY DELETED:",
            data[0]
        );

        alert("Product deleted successfully.");

        await loadProducts();

    }

    catch (error) {

        console.error(
            "DELETE PRODUCT ERROR:",
            error
        );

        if (button) {
            button.disabled = false;
            button.textContent = "DELETE";
        }

        alert(
            "Unable to delete product:\n\n" +
            (
                error.message ||
                "Unknown error"
            )
        );

    }

}
/* =========================================================
   REMOVE STORAGE FILE
========================================================= */

async function removeStorageFile(
    storagePath
) {

    if (!storagePath) {
        return;
    }


    const {
        error
    } =
        await supabaseClient
            .storage
            .from("gallery")
            .remove([
                storagePath
            ]);


    if (error) {

        console.error(
            "Storage delete error:",
            error
        );

    }

}


/* =========================================================
   LOAD GALLERY
========================================================= */

async function loadGallery() {

    if (!adminGallery) {
        return;
    }


    adminGallery.innerHTML = `

        <div class="empty-state">

            Loading gallery...

        </div>

    `;


    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("gallery_images")
                .select(
                    "id, collection, image_url, storage_path, created_at"
                )
                .order(
                    "created_at",
                    {
                        ascending:
                            false
                    }
                );


        if (error) {

            throw error;

        }


        renderGallery(
            data || []
        );

    }

    catch (error) {

        console.error(
            "Gallery error:",
            error
        );


        adminGallery.innerHTML = `

            <div class="empty-state">

                <strong>
                    Unable to load gallery.
                </strong>

                <br><br>

                ${escapeHtml(error.message)}

            </div>

        `;

    }

}


/* =========================================================
   RENDER GALLERY
========================================================= */

function renderGallery(
    images
) {

    if (!adminGallery) {
        return;
    }


    const filter =
        filterCollection?.value ||
        "all";


    let filteredImages =
        images;


    if (filter !== "all") {

        filteredImages =
            images.filter(
                image =>
                    image.collection ===
                    filter
            );

    }


    if (imageCount) {

        imageCount.textContent =
            `${filteredImages.length} ${
                filteredImages.length === 1
                    ? "image"
                    : "images"
            }`;

    }


    adminGallery.innerHTML =
        "";


    if (!filteredImages.length) {

        adminGallery.innerHTML = `

            <div class="empty-state">

                No images in this collection yet.

            </div>

        `;

        return;

    }


    filteredImages.forEach(
        function (image) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "admin-image-card";


            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                "admin-image-wrapper";


            const img =
                document.createElement(
                    "img"
                );


            img.src =
                image.image_url;


            img.alt =
                collectionNames[
                    image.collection
                ] ||
                "Candle Light Gallery";


            img.loading =
                "lazy";


            img.onerror =
                function () {

                    wrapper.innerHTML = `

                        <div class="empty-state">

                            Image unavailable

                        </div>

                    `;

                };


            wrapper.appendChild(
                img
            );


            const info =
                document.createElement(
                    "div"
                );


            info.className =
                "admin-image-info";


            const category =
                document.createElement(
                    "div"
                );


            category.className =
                "admin-category";


            category.textContent =
                collectionNames[
                    image.collection
                ] ||
                image.collection;


            const deleteBtn =
                document.createElement(
                    "button"
                );


            deleteBtn.type =
                "button";


            deleteBtn.className =
                "delete-button";


            deleteBtn.textContent =
                "DELETE IMAGE";


            deleteBtn.addEventListener(
                "click",
                function () {

                    deleteImage(
                        image,
                        deleteBtn
                    );

                }
            );


            info.appendChild(
                category
            );


            info.appendChild(
                deleteBtn
            );


            card.appendChild(
                wrapper
            );


            card.appendChild(
                info
            );


            adminGallery.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   GALLERY UPLOAD
========================================================= */

if (uploadBtn) {

    uploadBtn.addEventListener(
        "click",
        uploadImages
    );

}


async function uploadImages() {

    if (!imageInput || !collectionSelect) {
        return;
    }


    const files =
        Array.from(
            imageInput.files || []
        );


    const collection =
        collectionSelect.value;


    if (!files.length) {

        showMessage(
            uploadStatus,
            "Please choose at least one image.",
            "error"
        );

        return;

    }


    uploadBtn.disabled =
        true;

    uploadBtn.textContent =
        "UPLOADING...";


    showMessage(
        uploadStatus,
        `Uploading ${files.length} image(s)...`,
        ""
    );


    let uploaded =
        0;

    let failed =
        0;


    for (
        const file of files
    ) {

        if (
            !file.type ||
            !file.type.startsWith("image/")
        ) {

            failed++;

            continue;

        }


        try {

            const safeName =
                file.name
                    .replace(
                        /[^\w.-]+/g,
                        "-"
                    );


            const uniqueId =
                typeof crypto !== "undefined" &&
                crypto.randomUUID
                    ? crypto.randomUUID()
                    : Date.now();


            const storagePath =
                `${collection}/${Date.now()}-${uniqueId}-${safeName}`;


            /* -----------------------------------------
               UPLOAD TO STORAGE
            ----------------------------------------- */

            const {
                error:
                    storageError
            } =
                await supabaseClient
                    .storage
                    .from("gallery")
                    .upload(
                        storagePath,
                        file,
                        {
                            upsert:
                                false,

                            contentType:
                                file.type
                        }
                    );


            if (storageError) {

                throw storageError;

            }


            /* -----------------------------------------
               PUBLIC URL
            ----------------------------------------- */

            const {
                data:
                    publicData
            } =
                supabaseClient
                    .storage
                    .from("gallery")
                    .getPublicUrl(
                        storagePath
                    );


            const imageUrl =
                publicData.publicUrl;


            /* -----------------------------------------
               SAVE DATABASE
            ----------------------------------------- */

            const {
                error:
                    databaseError
            } =
                await supabaseClient
                    .from("gallery_images")
                    .insert({

                        collection:
                            collection,

                        image_url:
                            imageUrl,

                        storage_path:
                            storagePath

                    });


            if (databaseError) {

                await removeStorageFile(
                    storagePath
                );

                throw databaseError;

            }


            uploaded++;

        }

        catch (error) {

            console.error(
                "Gallery upload error:",
                error
            );

            failed++;

        }

    }


    imageInput.value =
        "";


    uploadBtn.disabled =
        false;

    uploadBtn.textContent =
        "UPLOAD IMAGES";


    if (failed === 0) {

        showMessage(
            uploadStatus,
            `${uploaded} image(s) uploaded successfully.`,
            "success"
        );

    }

    else {

        showMessage(
            uploadStatus,
            `${uploaded} uploaded, ${failed} failed.`,
            failed === files.length
                ? "error"
                : ""
        );

    }


    await loadGallery();

}


/* =========================================================
   DELETE GALLERY IMAGE
========================================================= */

async function deleteImage(
    image,
    button
) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this image?"
        );


    if (!confirmed) {
        return;
    }


    button.disabled =
        true;

    button.textContent =
        "DELETING...";


    try {

        /* -----------------------------------------
           STORAGE
        ----------------------------------------- */

        if (image.storage_path) {

            const {
                error:
                    storageError
            } =
                await supabaseClient
                    .storage
                    .from("gallery")
                    .remove([
                        image.storage_path
                    ]);


            if (storageError) {

                throw storageError;

            }

        }


        /* -----------------------------------------
           DATABASE
        ----------------------------------------- */

        const {
            error:
                databaseError
        } =
            await supabaseClient
                .from("gallery_images")
                .delete()
                .eq(
                    "id",
                    image.id
                );


        if (databaseError) {

            throw databaseError;

        }


        await loadGallery();

    }

    catch (error) {

        console.error(
            "Gallery delete error:",
            error
        );


        button.disabled =
            false;

        button.textContent =
            "DELETE IMAGE";


        alert(
            "Unable to delete this image. Please try again."
        );

    }

}


/* =========================================================
   GALLERY FILTER
========================================================= */

if (filterCollection) {

    filterCollection.addEventListener(
        "change",
        loadGallery
    );

}


/* =========================================================
   MESSAGE HELPER
========================================================= */

function showMessage(
    element,
    text,
    type
) {

    if (!element) {
        return;
    }


    element.textContent =
        text;


    element.className =
        "message";


    if (type) {

        element.classList.add(
            type
        );

    }

}


/* =========================================================
   HTML ESCAPE HELPER
========================================================= */

function escapeHtml(
    value
) {

    return String(
        value || ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   START
========================================================= */

checkSession();