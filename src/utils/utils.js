// 深拷贝
export function extend(source) {
  let sourceCopy = source.constructor === Array ? [] : {}
  for (let keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        sourceCopy[keys] = source.constructor === Array ? [] : {}
        sourceCopy[keys] = extend(source[keys])
      } else {
        sourceCopy[keys] = source[keys]
      }
    }
  }
  return sourceCopy
}

// canvas旋转图片
export function rotateImg(file, canvas, angle) {
  if (file.imgDTO) {
    file.imgDTO.angle = file.imgDTO.angle ? file.imgDTO.angle + angle : angle
    canvas.imgDTO = file.imgDTO
  } else {
    canvas.imgDTO = new Image()
    canvas.imgDTO.angle = angle
    canvas.imgDTO.src = file.src
    canvas.width = file.width
    canvas.height = file.height
  }
  canvas.imgDTO.angle <= 0 && (canvas.imgDTO.angle = canvas.imgDTO.angle + 360)
  canvas.imgDTO.angle > 360 && (canvas.imgDTO.angle = canvas.imgDTO.angle - 360)
  canvas.width = [90, 270].includes(canvas.imgDTO.angle) ? canvas.imgDTO.height : canvas.imgDTO.width
  canvas.height = [90, 270].includes(canvas.imgDTO.angle) ? canvas.imgDTO.width : canvas.imgDTO.height
  let translateList = {
    90: [canvas.imgDTO.height, 0],
    180: [canvas.imgDTO.width, canvas.imgDTO.height],
    270: [0, canvas.imgDTO.width],
    360: [0, 0]
  }
  let ctx = canvas.getContext("2d")
  ctx.translate(translateList[canvas.imgDTO.angle][0], translateList[canvas.imgDTO.angle][1]);
  ctx.rotate(canvas.imgDTO.angle / 180 * Math.PI);
  ctx.drawImage(canvas.imgDTO, 0, 0, canvas.imgDTO.width, canvas.imgDTO.height)
  ctx.stroke()
}
