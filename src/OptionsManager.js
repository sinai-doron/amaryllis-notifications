let defaultOptions = {
    timeout: 3000,
    location: 'top-left',
    type: 'generic'
}

function setDefaults(newDefaults){
    defaultOptions = Object.assign(defaultOptions, newDefaults);
}

function getDefaults(){
    return defaultOptions;
}

export { setDefaults, getDefaults }