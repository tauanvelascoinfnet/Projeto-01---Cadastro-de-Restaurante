
module.exports = (labelAtribute, valueAtribute, itens) => {
    
    return itens.map(item => {
        return {
            label: item[labelAtribute],
            value: item[valueAtribute]
        }
    })
}