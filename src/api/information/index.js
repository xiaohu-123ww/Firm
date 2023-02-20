import request from '@/utils/request'

export function getList (limit, offset, status, start_time, end_time, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, status, start_time, end_time, keywords
    }
  })
}
export function getLists (limit, status, start_time, end_time, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, status, start_time, end_time, keywords
    }
  })
}
export function getListOne (limit, status, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, status, keywords
    }
  })
}
export function getListTwo (limit, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, keywords
    }
  })
}

export function getListThree (limit, status, start_time, end_time) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, status, start_time, end_time
    }
  })
}
export function getListFour (limit, start_time, end_time, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, start_time, end_time, keywords
    }
  })
}

export function getListFive (limit, status, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, status, keywords
    }
  })
}

export function getListSex (limit, status) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, status
    }
  })
}
export function getListNum (limit, start_time, end_time) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, start_time, end_time
    }
  })
}

export function getDelete (data) {
  return request.delete(`/enterprise/collections/${data}/`)
}
export function getLikes (data) {
  return request.post(`/enterprise/collections/${data}/`)
}

export function getListss (limit, offset, status, start_time, end_time, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, status, start_time, end_time, keywords
    }
  })
}
export function getListOnes (limit, offset, status, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, status, keywords
    }
  })
}
export function getListTwos (limit, offset, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, keywords
    }
  })
}

export function getListThrees (limit, offset, status, start_time, end_time) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, status, start_time, end_time
    }
  })
}
export function getListFours (limit, offset, start_time, end_time, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, start_time, end_time, keywords
    }
  })
}

export function getListFives (limit, offset, status, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, status, keywords
    }
  })
}

export function getListSexs (limit, offset, status) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, status
    }
  })
}
export function getTime (limit, offset, start_time, end_time) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, start_time, end_time
    }
  })
}

