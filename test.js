import test from 'ava'
import delay from 'delay'
import { spy } from 'sinon'
import using from './index'

const createDisposable = (dispose = 'dispose') => ({
  [dispose]: spy()
})

test('call the callback', async t => {
  const cb = spy()
  const disposable = createDisposable()
  await using(disposable, cb)
  t.true(disposable.dispose.calledOn(disposable))
  t.true(cb.calledWith(disposable))
})

test('accept an async callback', async t => {
  let called = false
  const cb = spy(() => delay(0).then(() => { called = true }))
  const disposable = createDisposable()
  await using(disposable, cb)
  t.true(disposable.dispose.calledOn(disposable))
  t.true(called)
})

test('accept a custom dispose method name', async t => {
  const cb = spy()
  const disposable = createDisposable('close')
  await using(disposable, cb, 'close')
  t.true(disposable.close.calledOn(disposable))
  t.true(cb.calledWith(disposable))
})

test('accept a custom dispose function', async t => {
  const cb = spy()
  const dispose = spy()
  const disposable = {}
  await using(disposable, cb, dispose)
  t.true(dispose.calledOn(disposable))
  t.true(cb.calledWith(disposable))
})
