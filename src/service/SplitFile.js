function SplitFile(fileBuffer) {
    const Files = [];
    const sizeFile = fileBuffer.length;
    const chunkSize = [];

    if (sizeFile % 3 !== 0) {
        chunkSize.push(0);
        var mod = sizeFile - (sizeFile % 3);
        chunkSize.push(mod / 3);
        chunkSize.push((2 * mod) / 3);
        chunkSize.push((3 * mod) / 3 + (sizeFile % 3));
        console.log(chunkSize);
        for (let i = 1; i < chunkSize.length; i += 1) {
            Files.push(
                fileBuffer.slice(
                    chunkSize[i - 1],
                    chunkSize[i - 1] + chunkSize[i],
                ),
            );
        }
    } else {
        for (let i = 0; i < sizeFile; i += sizeFile / 3) {
            Files.push(fileBuffer.slice(i, i + sizeFile / 3));
        }
    }
    return Files;
}

module.exports = {
    SplitFile,
};
