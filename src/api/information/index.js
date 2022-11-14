import request from '@/utils/request'

export function getList (limit, offset, status, start_time, end_time, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, status, start_time, end_time, keywords
    }
  })
}

export function getListOne (limit, offset, status, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, status, keywords
    }
  })
}
export function getListTwo (limit, offset, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, keywords
    }
  })
}

export function getListThree (limit, offset, status, start_time, end_time) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, status, start_time, end_time
    }
  })
}
export function getListFour (limit, offset, start_time, end_time, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, start_time, end_time, keywords
    }
  })
}

export function getListFive (limit, offset, status, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, status, keywords
    }
  })
}

export function getListSex (limit, offset, keywords) {
  return request.get('/enterprise/position-collection/v1.0.1/', {
    params: {
      limit, offset, keywords
    }
  })
}

export function getDelete (data) {
  return request.delete('/enterprise/position-collection/v1.0.1/', { data: data })
}

