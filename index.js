function onDocumentReady(ready, d) {
  if (d.readyState === 'loading') {
    return d.addEventListener('DOMContentLoaded', function () {
      return ready(d)
    })
  }

  return ready(d)
}

function formStorage(id, storage) {
  const hashId = encodeURIComponent(id)
  console.log(hashId)
  function setFormState(data) {
    storage.setItem(hashId, JSON.stringify(data))
  }

  function getFormState() {
    const data = storage.getItem(hashId)
    if (data === null) {
      return {}
    }

    return JSON.parse(data)
  }
}

function upgradeForm(href, f, w) {
  const fstorage = formStorage(`${href},${f.id}`, w.localStorage)
  f.addEventListener('submit', function (e) {
    e.preventDefault()
    alert('submit')
  })

  w.document.addEventListener('beforeunload', function (e) {
    e.preventDefault()
    console.log('beforeunload')
  })

  f.addEventListener('input', function (e) {
    console.log('input', e.target.name, e.target.value)
  })

  f.addEventListener('change', function (e) {
    console.log('change', e.target.name, e.target.value)
  })

  f.addEventListener('reset', function (e) {
    console.log('reset', e.target.name, e.target.value)
  })

  f.addEventListener('submit', function (e) {
    console.log('submit', e.target.name, e.target.value)
  })

  // for (const i of w.document.getElementsByTagName('input')) {
  //   i.addEventListener(
  //     'change',
  //     function (e) {
  //       console.log(e.target.name, e.target.value)
  //     },
  //     false
  //   )
  // }
}

onDocumentReady(function (window) {
  upgradeForm(
    window.location.href,
    window.document.getElementById('demo-form'),
    window
  )
}, window)
