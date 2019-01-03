import * as legaleagle from 'legal-eagle'
import __basedir from '../basedir'

legaleagle({ path: __basedir }, _ => {
  console.log(_)
})

console.log('mizucoffee')
