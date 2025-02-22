import { useLanguage } from '../../i18n/LanguageContext';
import { Select, Input } from 'antd';
import { Icon } from '@iconify/react';
import { getMdiIcons } from '../../utils/helper';
function LightOverviewConfig({field, value,handleLightOverviewChange,getFilteredEntities,handleDeleteRoom,handleAddRoom}) {
    const { t } = useLanguage();
    return (
        <div className="config-field">
          <label>{field.label}</label>
          <div className="light-overview-config">
            {Array.isArray(value) && value.map((room, index) => (
              <div key={index} className="light-room-item">
                <div className="room-field">
                  <label>{t('configField.roomName')}</label>
                  <Input
                    value={room.name}
                    onChange={(e) => handleLightOverviewChange(index, 'name', e.target.value)}
                    placeholder={t('configField.placeholderRoomName')}
                  />
                </div>
                <div className="room-field">
                  <label>{t('configField.selectIcon')}</label>
                  <Select
                    allowClear
                    value={room.icon}
                    onChange={(value) => handleLightOverviewChange(index, 'icon', value)}
                    showSearch
                    placeholder={t('configField.selectIcon')} 
                    optionFilterProp="children"
                    style={{ width: '100%' }}
                  >
                    {getMdiIcons().map(icon => (
                      <Select.Option key={icon.name} value={icon.name}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Icon icon={icon.name} width="20" />
                          <span>{icon.label}</span>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                
                
                <div className="room-field">
                  <label>{t('configField.selectEntity')}</label>
                  <Select
                    allowClear
                    value={room.entity_id}
                    onChange={(value) => handleLightOverviewChange(index, 'entity_id', value)}
                    showSearch
                    placeholder={t('configField.selectEntityPlaceholder')}
                    optionFilterProp="children"
                    style={{ width: '100%' }}
                  >
                    {getFilteredEntities('light.*|switch.*').map(entity => (
                      <Select.Option key={entity.id} value={entity.id}>
                        {entity.name} ({entity.id})
                      </Select.Option>
                    ))}
                  </Select>
                </div>

                <div className="room-field">
                  <label>{t('configField.buttonPositionLeft')}</label>
                  <Input
                    value={room.position?.left}
                    onChange={(e) => handleLightOverviewChange(index, 'position', { ...room.position, left: e.target.value })}
                    placeholder={t('configField.placeholderPositionLeft')}
                  />
                </div>

                <div className="room-field">
                  <label>{t('configField.buttonPositionTop')}</label>
                  <Input
                    value={room.position?.top}
                    onChange={(e) => handleLightOverviewChange(index, 'position', { ...room.position, top: e.target.value })}
                    placeholder={t('configField.placeholderPositionTop')}
                  />
                </div>

                <div className="room-field">
                  <label>{t('configField.lightEffectImage')}</label>
                  <div className="upload-field">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const formData = new FormData();
                          formData.append('file', file);
                          try {
                            const response = await fetch('./api/common/upload', {
                              method: 'POST',
                              body: formData
                            });
                            const result = await response.json();
                            if (result.code === 200) {
                              handleLightOverviewChange(index, 'image', result.data.file_path);
                              console.log(result.data.file_path);
                              // 给input赋值

                            }
                          } catch (error) {
                            console.error('上传失败:', error);
                          }
                        }
                      }}
                      style={{ display: 'none' }}
                      id={`image-upload-${index}`}
                    />
                    <Input 
                      value={room.image || ''}
                      placeholder={t('fields.placeholderImage')}
                      readOnly
                      addonAfter={
                        <label htmlFor={`image-upload-${index}`} style={{ cursor: 'pointer' }}>
                          {t('fields.uploadImage')}
                        </label>
                      }
                    />
                  </div>
                </div>

                <button onClick={() => handleDeleteRoom(index)}>{t('configField.deleteButton')}</button>
              </div>
            ))}
          </div>
          <button onClick={handleAddRoom}>{t('configField.addButton')}</button>
        </div>
      );
}

export default LightOverviewConfig;