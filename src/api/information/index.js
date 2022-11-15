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

export function getDelete (data) {
  return request.delete('/enterprise/position-collection/v1.0.1/', { data: data })
}

