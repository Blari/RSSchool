const transform = async function* (source, code, cb) {
  let data = [];
  for await (const chunk of source ) {
    console.log(chunk.toUpperCase())
    data.push(chunk.toUpperCase())
  }

  cb(null, data)
}

exports.transform = transform;
