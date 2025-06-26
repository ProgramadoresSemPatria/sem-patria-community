'use client'
import React, { useEffect } from 'react'
import { Modal } from '@/components/ui/modal'
import { useOnBoarding } from '@/hooks/on-boarding/use-on-boarding'
import { Button } from '@/components/ui/button'

const OnBoardingModal = () => {
  const { isOpen, onClose, markVideoAsWatched, initializeWatchedStatus } =
    useOnBoarding()

  useEffect(() => {
    initializeWatchedStatus()
  }, [initializeWatchedStatus])

  return (
    <>
      <Modal
        className="border-slate-600"
        title="On Boarding Video"
        description="Watch the entire video to find out how the platform works. Mark as watched so you won't see this modal again"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="relative pb-[64.63195691202873%] h-0">
          <iframe
            src="https://www.loom.com/share/d46844f4d5ab4040b5dd915caa82ecf8?sid=67b383f5-0c48-46ff-ad66-0eb5bdba337b"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
        <Button className="mt-4" type="reset" onClick={markVideoAsWatched}>
          Mark as Watched
        </Button>
      </Modal>
    </>
  )
}

export default OnBoardingModal
