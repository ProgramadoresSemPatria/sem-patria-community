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
        description="Watch the entire video to know how the platform works. If you mark as watched you can't see this anymore"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="relative pb-[64.63195691202873%] h-0">
          <iframe
            src="https://www.loom.com/embed/cd2c80c4fcb24b18b923d1e2ff70aabc?sid=05e24991-9efd-4a00-b3cb-134647bcd439"
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
