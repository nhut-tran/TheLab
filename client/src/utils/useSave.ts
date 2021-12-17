


const saveData = (item: string, value: any) => {

    localStorage.setItem(item, JSON.stringify(value))
}

export default saveData