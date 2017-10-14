const invoke = (callback) => (resource) => (
  Promise
    .resolve(callback(resource))
    .then(() => resource)
)

const dispose = (disposeFunction) => (resource) => (
  typeof disposeFunction === 'string'
    ? resource[disposeFunction]()
    : disposeFunction.call(resource)
)

/**
 * @param {Object|Promise} resource Resource to be disposed.
 * @param {Function} callback Function to be invoked before disposal.
 * @param {String|Function} disposeFunction Name of the method or function called for disposal.
 * @return {Promise} Promise resolved when the resource has been disposed.
 */
export default function using(resource, callback, disposeFunction = 'dispose') {
  return Promise.resolve(resource)
    .then(invoke(callback))
    .then(dispose(disposeFunction))
}
