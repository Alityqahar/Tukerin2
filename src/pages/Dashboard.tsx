import ClickSpark from "../components/ClickSpark/ClickSpark"
import DashboardContainer from "../components/Dashboard/DashboardContainer"

export default function Dashboard(){
    return(
        <section className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-green-800 my-4 text-center">
                    Dashboard
                </h1>
                <ClickSpark
                    sparkColor='#4a7c23'
                    sparkSize={10}
                    sparkRadius={15}
                    sparkCount={8}
                    duration={400}
                >
                    <DashboardContainer />
                </ClickSpark>
            </div>
        </section>
    )
}