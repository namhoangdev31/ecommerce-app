import { View } from "app/design/view"
import { Text, TextLink} from "app/design/typography"

export function DataScreen() {
    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-2xl font-bold">Data</Text>
            <TextLink href="/">👈 Go Home</TextLink>
        </View>
    )
}