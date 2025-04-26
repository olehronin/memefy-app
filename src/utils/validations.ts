const urlPattern = /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[a-z\d_-]*)?$/i;

export const isValidImageUrl = (urlString: string): boolean => {
    return urlPattern.test(urlString) && /\.(jpg|jpeg|gif|png)(\?.*)?$/i.test(urlString);
};

export const checkImageExists = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            resolve(true);
        };
        img.onerror = () => {
            resolve(false);
        };
        img.src = url;
        setTimeout(() => {
            resolve(false);
        }, 5000);
    });
};

export const validateAndCheckImage = async (url: string): Promise<boolean> => {
    return isValidImageUrl(url) && await checkImageExists(url);
};
