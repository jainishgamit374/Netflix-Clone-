export const LOGO = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";

export const dp = "https://i.pinimg.com/1200x/93/39/35/933935adf570d7474beedb12fb997aee.jpg";

export const bg = "https://assets.nflxext.com/ffe/siteui/vlv3/9ba9f0e2-b246-47f4-bd1f-3e84c23a5db8/web/IN-en-20251020-TRIFECTA-perspective_d6da84e9-6145-4b1e-bb51-e402c966a045_large.jpg"
     

export const API_OPTIONS =  {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
  }
};


export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";
export const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;
export const SUPPORTED_LANGUAGES = [
  //  <option value="en">English</option>
  //           <option value="hindi">Hindi</option>
  //           <option value="spanish">Spanish</option>
  {identifier:"en" ,name:"English"},
   {identifier:"hindi" ,name:"Hindi"},
    {identifier:"spanish" ,name:"Spanish"},
]