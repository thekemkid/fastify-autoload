'use strict'

const t = require('tap')
const Fastify = require('fastify')

t.plan(15)

const app = Fastify()

app.register(require('./fixtures/app'))

app.ready(function (err) {
  t.error(err)

  app.inject({
    url: '/something'
  }, function (err, res) {
    t.error(err)

    t.equal(res.statusCode, 200)
    t.deepEqual(JSON.parse(res.payload), { something: 'else' })
  })

  app.inject({
    url: '/foo/bar'
  }, function (err, res) {
    t.error(err)

    t.equal(res.statusCode, 200)
    t.deepEqual(JSON.parse(res.payload), { foo: 'bar' })
  })

  app.inject({
    url: '/prefixed'
  }, function (err, res) {
    t.error(err)

    t.equal(res.statusCode, 200)
    t.deepEqual(JSON.parse(res.payload), { something: 'else' })
  })

  app.inject({
    url: '/skip'
  }, function (err, res) {
    t.error(err)
    t.equal(res.statusCode, 404)
  })

  app.inject({
    url: '/options'
  }, function (err, res) {
    t.error(err)
    t.equal(res.statusCode, 200)
    t.deepEqual(JSON.parse(res.payload), {
      foo: 'bar'
    })
  })
})
