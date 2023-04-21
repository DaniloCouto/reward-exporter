import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import { getBroadcasterId, getCustomRewards, getCustomRewardsRedemption } from '../../services/twitch'
import { Redemption, Reward, SimpleRedemption } from '../../services/twitch_types'
import { Button, CircularProgress, MenuItem, Select, SelectChangeEvent } from '@mui/material'


interface RewardExportProps {
    token: string
}

const RewardExport: React.FC<RewardExportProps> = ({ token }) => {
    const [ rewards, setRewards] = useState<Reward[]>([])
    const [ selectedReward, setSelectedReward ] = useState<string>('')
    const [ selectedRewardError, setSelectedRewardError ] = useState<boolean>(false)
    const [ selectedStatus, setSelectedStatus ] = useState<string>('UNFULFILLED')
    const [ clientId, setClientId ] = useState<string>('')
    const [ loading, setLoading] = useState<boolean>(false)

    const gatherClientIdAndCustomRewards = async () => {
        let internalClientId = clientId
        setLoading(true)
        if(!internalClientId){
            setLoading(true);
            const id = await getBroadcasterId(token)
            internalClientId = id
            setClientId(id)
        }
        const rewards = await getCustomRewards(token, internalClientId)
        setRewards(rewards)
        setLoading(false)
    }

    useEffect(()=>{
        if(token){
            gatherClientIdAndCustomRewards()
        }
    },[ token ]) 

    const downloadExcel = (data : SimpleRedemption[] ) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "RedemptionReward.xlsx");
    };

    const handleChangeSelectedReward = (event: SelectChangeEvent) => {
        setSelectedReward(event.target.value);
        if(event.target.value !== ''){
            setSelectedRewardError(false)
        }
    };

    const handleChangeSelectedStatus = (event: SelectChangeEvent) => {
      setSelectedStatus(event.target.value);
    };

    const exportRewards = async () => {
        setLoading(true)
        if(selectedReward){
          const redemptions = await getCustomRewardsRedemption(token, clientId, selectedReward, selectedReward)
          let simpleRedemptions : SimpleRedemption[] = []
          for (let i = 0; i < redemptions.length; i++ ){
            simpleRedemptions = [
              ...simpleRedemptions,
              {
                user_name: redemptions[i].user_name,
                redemption: redemptions[i].reward.prompt
              }
            ]
          }
          downloadExcel(simpleRedemptions)
          setLoading(false)
          return 
        }
        setSelectedRewardError(true)
        setLoading(false)
    };

    if(loading){
        return (
            <CircularProgress />
        )
    }

    if(rewards && rewards.length){
        return (
            <div>
              <Select
                value={selectedReward}
                onChange={handleChangeSelectedReward}
                displayEmpty
                error={selectedRewardError}
              >
                <MenuItem value="">
                  <em>Nenhum</em>
                </MenuItem>
                {rewards && rewards.map((reward) => (
                  <MenuItem value={reward.id}>{reward.title}</MenuItem>
                ))}
              </Select>
              <Select
                value={selectedStatus}
                onChange={handleChangeSelectedStatus}
                displayEmpty
              >
                <MenuItem value="UNFULFILLED">Não avaliado</MenuItem>
                <MenuItem value="CANCELED">Recusado</MenuItem>
                <MenuItem value="FULFILLED">Completo</MenuItem>
              </Select>
              <Button onClick={exportRewards} > Exportar Resgate e Resgatante em XLS</Button>
            </div>
          );
    }

    return (
        <div> Não foi possivel recuperar as suas recompensas </div>
    )
    
  }

export default RewardExport;