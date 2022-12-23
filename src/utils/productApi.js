import { get, post, put, remove } from './ApiCaller'

class productApi {
  //event apis
  getAllEvent() {
    return get('/api/events', {}, {}).catch((err) => console.error(err))
  }

  createEvent(body) {
    return post('api/events', body, {}, {}).catch((err) => console.error(err))
  }

  getEvent(id) {
    return get('api/events/' + id, {}, {}).catch((err) => console.error(err))
  }

  updateEvent(id, body) {
    return put('api/events/' + id, body, {}, {}).catch((err) => console.error(err))
  }

  deleteEvent(id) {
    return remove('api/events/' + id, {}, {}, {}).catch((err) => console.error(err))
  }

  //member apis
  getUser(token) {
    return get(
      '/member/own',
      {},
      {
        authorization: token,
      }
    ).catch((err) => {
      console.log(err)
    })
  }
  updatePoint(userId, point, token) {
    return post(
      'api/user/' + userId + 'change-point',
      { points: point },
      {},
      {
        authorization: token,
      }
    ).catch((err) => console.log(err))
  }

  //attendance apis
  // setAttendance(userId, eventId, token) {
  //   return post(
  //     '/api/check-attendance',
  //     { memeber_id: userId, event_id: eventId },
  //     {},
  // //       {
  //   Authorization: token,
  // }
  //   ).catch((err) => console.log(err))
  // }
  getAttendance(userId, eventId, token) {
    return get(
      'api/check-attendance?member_id=' + userId + '&event_id=' + eventId,
      {},
      { authorization: token }
    ).catch((err) => console.log(err))
  }
  setAttendance(memberId, eventId, status, token) {
    return post(
      '/api/check-attendance',
      { member_id: memberId, event_id: eventId, status: status },
      {},
      { authorization: token }
    ).catch((err) => console.log(err))
  }
}

export default new productApi()
