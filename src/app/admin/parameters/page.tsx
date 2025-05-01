import ParametersPage from "@/app/components/parameters/parameters-page"
import { getParameters } from "@/app/components/parameters/parameters-data"

export default async function Parameters() {
    // Fetch parameters on the server
    const parameters = await getParameters()

    return <ParametersPage initialParameters={parameters} />
}
