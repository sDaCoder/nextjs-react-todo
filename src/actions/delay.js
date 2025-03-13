export const delay = async (dtime) => {
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, dtime);
    })
}