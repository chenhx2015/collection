const a = (async() => {
    await Promise();
    return 1;
})();
// 请输出当Promise 为 reject的时候，a是什么
// 请输出当Promise 为 resolve的时候，a是什么