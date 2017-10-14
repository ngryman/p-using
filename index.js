/**
 * @param {Object} resource Resource to be disposed.
 * @param {Function} callback Function to be invoked before disposal.
 * @param {String|Function} disposeFunction Name of the method or function called for disposal.
 * @return {Promise} Promise resolved when the resource has been disposed.
 */
export default function using(resource, callback, disposeFunction = 'dispose') {
  function callDispose() {
    if (typeof disposeFunction === 'string') {
      disposeFunction = resource[disposeFunction]
    }
    return Promise.resolve().then(disposeFunction.bind(resource))
  }

  const ret = callback(resource)

  if (ret && ret.then) {
    return ret.then(callDispose)
  }
  return callDispose()
}
