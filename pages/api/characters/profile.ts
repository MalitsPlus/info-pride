import type { NextApiRequest, NextApiResponse } from 'next'

import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'
import pickFirstOrOne from '#utils/pickFirstOrOne'
import { DEFAULT_LANGUAGE } from '#utils/constants'
import data from '#data/profile.data'
import type { CharacterId } from '#data/vendor/characterId'

const charactersProfile = async (
    req: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['characters/profile']>
) => {
    const q = req.query

    if (!q.id || !q.locale) {
        res.status(400).end()
        return
    }

    const id = String(q.id) as CharacterId
    const locale = q.locale ? pickFirstOrOne(q.locale) : DEFAULT_LANGUAGE

    const profile = data?.[locale]?.[id]
    if (profile) {
        // Cache for 7d
        res.setHeader('Cache-Control', 'max-age=604800')
        res.status(200).json({
            profile,
        })
        return
    }

    res.status(404).end()
    return
}

export default charactersProfile

export const config = {
    api: {
        externalResolver: true,
    },
}
