/**
 * 
 * @param {Object} resource Resource to be disposed.
 * @param {Function} callback Function to be invoked before disposal.
 * @param {String|Function} disposeFunction Name of the method or function called for disposal.
 */
export default async function using(resource, callback, disposeFunction = 'dispose') {
  await callback()

  if (typeof disposeFunction === 'string') {
    await resource[disposeFunction]()
  }
  else {
    await disposeFunction.call(resource)
  }
}
