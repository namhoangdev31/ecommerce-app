import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'


interface DropdownWithHookProps {
  data: Array<{ label: string; value: string }>
}

const DropdownWithHook: React.FC<DropdownWithHookProps> = ({ data }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocused && { borderColor: 'blue' }]}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!isFocused ? 'Select an item' : '...'}
        value={selectedValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(item) => {
          setSelectedValue(item.value)
          setIsFocused(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
  },
})

export default DropdownWithHook
