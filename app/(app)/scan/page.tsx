'use client'

import Image from 'next/image'
import AnimatedContainer from '@/components/shared/AnimatedContainer'
import ErrorState from '@/components/feedback/ErrorState'
import Loader from '@/components/feedback/Loader'
import UploadDropzone from '@/features/scan/components/UploadDropzone'
import ScanHistoryList from '@/features/scan/components/ScanHistoryList'
import { useScanHistory } from '@/features/scan/hooks/useScanHistory'

export default function ScanPage() {
  const {
    activeId,
    addOptimisticScan,
    error,
    history,
    loading,
    refresh,
    setActiveId,
  } = useScanHistory()

  return (
    <div className="space-y-7">
      <AnimatedContainer>
        <section className="surface overflow-hidden">
          <div className="grid lg:grid-cols-[1fr_360px]">
            <div className="p-6 md:p-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                AI diagnosis
              </p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Turn one plant image into a clear treatment path.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/64">
                Upload a leaf or full-plant photo, link it to an existing plant,
                and E4rth will store confidence, severity, and suggested care
                steps in your scan history.
              </p>
            </div>
            <div className="relative hidden min-h-64 lg:block">
              <Image
                src="https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=900&q=80"
                alt="Plant leaves prepared for diagnosis"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soil/70 to-transparent" />
            </div>
          </div>
        </section>
      </AnimatedContainer>

      <UploadDropzone onResult={addOptimisticScan} />

      <div>
        <h3 className="mb-3 mt-8 text-lg font-semibold">Scan History</h3>

        {loading ? (
          <Loader label="Loading diagnosis history" />
        ) : error ? (
          <ErrorState message={error} onRetry={refresh} />
        ) : (
          <ScanHistoryList
            history={history}
            activeId={activeId}
            setActiveId={setActiveId}
          />
        )}
      </div>
    </div>
  )
}
