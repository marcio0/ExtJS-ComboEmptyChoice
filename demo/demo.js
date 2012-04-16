Ext.onReady(function(){
    Ext.define('ModelTeste', {
        extend: 'Ext.data.Model',
        fields: ['id', 'name'],
        proxy: {
            type: 'memory'
        }
    });

    store = Ext.create('Ext.data.Store', {
        model: 'ModelTeste',
        data: [
            {id: 1, name: 'prim'},
            {id: 2, name: 'sec'},
            {id: 3, name: 'terc'}
        ]
    });

    p = Ext.create('Ext.panel.Panel', {
        renderTo: Ext.getBody(),
        layout: 'hbox',
        items: [
            {
                xtype: 'combobox',
                plugins: Ext.create('Ext.ux.plugin.ComboEmptyChoice'),
                store: store,
                displayField: 'name',
                allowBlank: false,
                valueField: 'id',
                editable: false
            },
            {
                xtype: 'button',
                text: 'get',
                handler: function(){
                    val = this.previousSibling('combobox').getValue();
                    console.log(val);
                    this.nextSibling('container').update([val]);
                }
            },
            {
                xtype: 'container',
                tpl: new Ext.XTemplate('{0}')
            }
        ]
    });
});
