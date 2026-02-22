import { Suspense } from 'react'
import { MarketplaceSkeleton } from '../components/MarketplaceSkeleton'
import Markeplace from './suppco-market'
 
export default function Page() {
  return (
    <Suspense fallback={ <MarketplaceSkeleton /> }>
      <Markeplace />
    </Suspense>
  )
}