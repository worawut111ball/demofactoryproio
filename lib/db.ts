// ไฟล์นี้จะจำลองฐานข้อมูลอย่างง่ายโดยใช้ localStorage ในฝั่ง client

// กำหนด prefix สำหรับ key ใน localStorage เพื่อป้องกันการชนกันของชื่อ
const KEY_PREFIX = "factory_pro_"

// ฟังก์ชันสำหรับอ่านข้อมูลจาก localStorage
export function readData<T>(key: string): T[] {
  if (typeof window === "undefined") {
    console.log("Running on server, returning empty array")
    return []
  }

  try {
    const fullKey = `${KEY_PREFIX}${key}`
    const data = localStorage.getItem(fullKey)
    console.log(`Reading data from localStorage (${fullKey}):`, data)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error(`Error reading data from localStorage (${key}):`, error)
    return []
  }
}

// ฟังก์ชันสำหรับเขียนข้อมูลลง localStorage
export function writeData<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") {
    console.log("Running on server, cannot write data")
    return
  }

  try {
    const fullKey = `${KEY_PREFIX}${key}`
    console.log(`Writing data to localStorage (${fullKey}):`, data)
    localStorage.setItem(fullKey, JSON.stringify(data))
  } catch (error) {
    console.error(`Error writing data to localStorage (${key}):`, error)
  }
}

// ฟังก์ชันสำหรับเพิ่มข้อมูลใหม่
export function addData<T extends { id: string }>(key: string, newItem: T): T {
  console.log(`Adding new item to ${key}:`, newItem)
  const data = readData<T>(key)
  data.push(newItem)
  writeData(key, data)
  return newItem
}

// ฟังก์ชันสำหรับอัปเดตข้อมูล
export function updateData<T extends { id: string }>(key: string, id: string, updatedItem: Partial<T>): T | null {
  const data = readData<T>(key)
  const index = data.findIndex((item) => item.id === id)

  if (index === -1) return null

  data[index] = { ...data[index], ...updatedItem }
  writeData(key, data)
  return data[index]
}

// ฟังก์ชันสำหรับลบข้อมูล
export function deleteData<T extends { id: string }>(key: string, id: string): boolean {
  const data = readData<T>(key)
  const filteredData = data.filter((item) => item.id !== id)

  if (filteredData.length === data.length) return false

  writeData(key, filteredData)
  return true
}

// ฟังก์ชันสำหรับค้นหาข้อมูลตาม ID
export function findDataById<T extends { id: string }>(key: string, id: string): T | null {
  const data = readData<T>(key)
  const item = data.find((item) => item.id === id)
  return item || null
}
