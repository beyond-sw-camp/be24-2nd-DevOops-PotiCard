import { apiFetch } from '@/plugins/interceptor'

const login = async (req) => {
  const res = await apiFetch('/user/login', {
    method: 'POST',
    body: req,
  })

  return res
}

const signup = async (req) => {
  const res = await apiFetch('/user/join', {
    method: 'POST',
    body: {
      email: req.email,
      name: req.name,
      password: req.password,
    },
  })

  return res
}

const profile = async (req) => {
  const token = localStorage.getItem('USERINFO')
  const res = await apiFetch('/user/profile', {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  return res
}

const checkEmailDuplicate = async (email) => {
  const res = await apiFetch('/user/check-email', {
    method: 'POST',
    body: { email },
  })

  return res
}

export default { login, signup, profile, checkEmailDuplicate }


// import api from '@/plugins/axiosinterceptor'

// const login = async (req) => {
//   const res = await api.post('/user/login', req)
//   return res
// }

// const signup = (req) => {
//   return api.post('/user/join', {
//     email: req.email,
//     name: req.name,
//     password: req.password,
//   })
// }

// const profile = async (req) => {
//   const token = localStorage.getItem('USERINFO')
//   const res = await api.get('/user/profile', {})
//   return res
// }

// const checkEmailDuplicate = async (email) => {
//   const res = await api.post('/user/check-email', { email })
//   return res
// }

// export default { login, signup, profile, checkEmailDuplicate }
